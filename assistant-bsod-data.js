(()=>{
'use strict';
const DETAIL={
'0x0000001a':['MEMORY_MANAGEMENT','memory','Windows обнаружила серьёзную ошибку управления памятью. Это не означает автоматически, что неисправна оперативная память.','Если сбой повторяется, запишите код и обстоятельства. Не меняйте сразу BIOS и тайминги памяти.'],
'0x00000024':['NTFS_FILE_SYSTEM','storage','Сбой связан с файловой системой NTFS или вводом-выводом накопителя.','Если Windows загружается, сначала сохраните важные данные, затем проверяйте накопитель.'],
'0x0000007a':['KERNEL_DATA_INPAGE_ERROR','storage','Windows не смогла корректно получить требуемые данные ядра из хранилища.','Не начинайте с переустановки Windows. Сначала зафиксируйте код и проверьте состояние накопителя.'],
'0x0000007b':['INACCESSIBLE_BOOT_DEVICE','boot','Windows потеряла доступ к системному разделу во время загрузки.','Уточните, не менялись ли BIOS/UEFI, режим контроллера, накопитель или параметры загрузки.'],
'0x0000007e':['SYSTEM_THREAD_EXCEPTION_NOT_HANDLED','driver','Системный поток вызвал исключение, которое Windows не смогла обработать.','Запишите имя файла или драйвера на синем экране и вспомните последние обновления драйверов.'],
'0x0000009f':['DRIVER_POWER_STATE_FAILURE','driver-power','Драйвер не завершил изменение состояния питания за допустимое время.','Уточните, возникает ли сбой при выключении, сне, пробуждении или перезагрузке.'],
'0x000000a5':['ACPI_BIOS_ERROR','firmware','Windows обнаружила проблему ACPI, связанную с BIOS/UEFI или совместимостью прошивки.','Запишите модель ПК и версию BIOS/UEFI. Не прошивайте BIOS вслепую.'],
'0x000000ef':['CRITICAL_PROCESS_DIED','system-process','Критически важный системный процесс Windows неожиданно завершился, поэтому система остановила работу. Возможны системные файлы, накопитель, драйвер, обновление или оборудование.','Если Windows загружается, сохраните важные данные и вспомните, что менялось перед первым сбоем.'],
'0x00000109':['CRITICAL_STRUCTURE_CORRUPTION','kernel','Windows обнаружила повреждение критической структуры ядра.','Зафиксируйте повторяемость и последние изменения драйверов или системного ПО.'],
'0x0000010e':['VIDEO_MEMORY_MANAGEMENT_INTERNAL','gpu','Внутренняя ошибка подсистемы управления видеопамятью.','Уточните, возникло ли это во время графической нагрузки и менялся ли видеодрайвер.'],
'0x00000113':['VIDEO_DXGKRNL_FATAL_ERROR','gpu','Критическая ошибка графического ядра DirectX.','Запишите обстоятельства сбоя и последние изменения видеодрайвера.'],
'0x00000116':['VIDEO_TDR_FAILURE','gpu','Windows не смогла восстановить видеодрайвер или GPU после тайм-аута.','Уточните, был ли перед сбоем чёрный экран, зависание изображения или нагрузка на GPU.'],
'0x00000120':['BITLOCKER_FATAL_ERROR','bitlocker','Критическая ошибка компонента BitLocker.','Не публикуйте ключ восстановления BitLocker. Сначала выясните, загружается ли Windows и запрашивается ли ключ.'],
'0x00000124':['WHEA_UNCORRECTABLE_ERROR','hardware','Windows зафиксировала фатальную аппаратную ошибку. По одному коду нельзя определить конкретную деталь.','Если есть разгон или undervolt, верните штатные настройки и зафиксируйте температуру и обстоятельства сбоя.'],
'0x00000133':['DPC_WATCHDOG_VIOLATION','driver-storage','Система обнаружила слишком долго выполнявшуюся операцию ядра; причиной могут быть драйверы или устройства.','Уточните последние изменения драйверов накопителя, чипсета, сети и другого оборудования.'],
'0x00000139':['KERNEL_SECURITY_CHECK_FAILURE','kernel','Ядро обнаружило повреждение критической структуры данных.','Запишите повторяемость и последние изменения драйверов или оборудования. Название кода само по себе не означает вирус.']
};
const INDEX=`
00000001 APC_INDEX_MISMATCH
0000000A IRQL_NOT_LESS_OR_EQUAL
00000018 REFERENCE_BY_POINTER
00000019 BAD_POOL_HEADER
0000001A MEMORY_MANAGEMENT
0000001E KMODE_EXCEPTION_NOT_HANDLED
00000023 FAT_FILE_SYSTEM
00000024 NTFS_FILE_SYSTEM
0000002E DATA_BUS_ERROR
00000034 CACHE_MANAGER
0000003B SYSTEM_SERVICE_EXCEPTION
00000050 PAGE_FAULT_IN_NONPAGED_AREA
00000051 REGISTRY_ERROR
0000005C HAL_INITIALIZATION_FAILED
0000006B PROCESS1_INITIALIZATION_FAILED
00000074 BAD_SYSTEM_CONFIG_INFO
00000077 KERNEL_STACK_INPAGE_ERROR
0000007A KERNEL_DATA_INPAGE_ERROR
0000007B INACCESSIBLE_BOOT_DEVICE
0000007E SYSTEM_THREAD_EXCEPTION_NOT_HANDLED
0000007F UNEXPECTED_KERNEL_MODE_TRAP
00000080 NMI_HARDWARE_FAILURE
00000085 SETUP_FAILURE
0000008E KERNEL_MODE_EXCEPTION_NOT_HANDLED
0000009C MACHINE_CHECK_EXCEPTION
0000009F DRIVER_POWER_STATE_FAILURE
000000A5 ACPI_BIOS_ERROR
000000BE ATTEMPTED_WRITE_TO_READONLY_MEMORY
000000C2 BAD_POOL_CALLER
000000C4 DRIVER_VERIFIER_DETECTED_VIOLATION
000000C5 DRIVER_CORRUPTED_EXPOOL
000000D1 DRIVER_IRQL_NOT_LESS_OR_EQUAL
000000EA THREAD_STUCK_IN_DEVICE_DRIVER
000000EF CRITICAL_PROCESS_DIED
000000F4 CRITICAL_OBJECT_TERMINATION
00000101 CLOCK_WATCHDOG_TIMEOUT
00000109 CRITICAL_STRUCTURE_CORRUPTION
0000010D WDF_VIOLATION
0000010E VIDEO_MEMORY_MANAGEMENT_INTERNAL
00000113 VIDEO_DXGKRNL_FATAL_ERROR
00000116 VIDEO_TDR_FAILURE
00000117 VIDEO_TDR_TIMEOUT_DETECTED
00000119 VIDEO_SCHEDULER_INTERNAL_ERROR
00000120 BITLOCKER_FATAL_ERROR
00000122 WHEA_INTERNAL_ERROR
00000124 WHEA_UNCORRECTABLE_ERROR
00000133 DPC_WATCHDOG_VIOLATION
00000139 KERNEL_SECURITY_CHECK_FAILURE
0000013A KERNEL_MODE_HEAP_CORRUPTION
00000154 UNEXPECTED_STORE_EXCEPTION
0000015A SDBUS_INTERNAL_ERROR
0000017E MICROCODE_REVISION_MISMATCH
0000018B SECURE_KERNEL_ERROR
0000018C HYPERGUARD_VIOLATION
00000191 PF_DETECTED_CORRUPTION
00000196 LOADER_ROLLBACK_DETECTED
00000197 WIN32K_SECURITY_FAILURE
0000019C WIN32K_POWER_WATCHDOG_TIMEOUT
000001AA EXCEPTION_ON_INVALID_STACK
000001AB UNWIND_ON_INVALID_STACK
000001C7 STORE_DATA_STRUCTURE_CORRUPTION
000001CA SYNTHETIC_WATCHDOG_TIMEOUT
000001CF HARDWARE_WATCHDOG_TIMEOUT
000001D2 WORKER_THREAD_INVALID_STATE
000001D3 WFP_INVALID_OPERATION
`.trim().split(/\n+/).map(x=>x.trim().split(/\s+/));
const byCode={},aliases={};
for(const [hex,name] of INDEX){const code='0x'+hex.toLowerCase();byCode[code]=name;aliases[name]=code}
for(const [code,d] of Object.entries(DETAIL)){byCode[code]=d[0];aliases[d[0]]=code}
function canonical(v){const s=String(v||'').trim().toUpperCase();if(aliases[s])return aliases[s];const m=s.match(/0X([0-9A-F]{1,8})/);return m?'0x'+m[1].padStart(8,'0').toLowerCase():null}
function card(code,name){const d=DETAIL[code];if(d)return {code,name:d[0],group:d[1],summary:d[2],first:d[3],detail:true};return {code,name:name||byCode[code]||'UNKNOWN_BUG_CHECK',group:'catalog',summary:'Этот код есть в официальном справочнике Bug Check Microsoft. По одному названию синего экрана нельзя надёжно определить первопричину.','first':'Сверьте код с экраном. Если сбой повторяется, запишите, что происходило перед ним; для точной диагностики могут понадобиться параметры ошибки и crash dump/WinDbg.',detail:false}}
function find(text){const raw=String(text||''),up=raw.toUpperCase();for(const name of Object.keys(aliases)){if(up.includes(name))return card(aliases[name],name)}const m=up.match(/0X[0-9A-F]{1,8}/);if(m){const code=canonical(m[0]);return card(code,byCode[code])}return null}
window.StepFlowBSOD={version:'2026-08-25-expanded',source:'Microsoft Learn — Bug Check Code Reference',sourceUrl:'https://learn.microsoft.com/windows-hardware/drivers/debugger/bug-check-code-reference2',db:DETAIL,index:byCode,aliases,count:Object.keys(byCode).length,find,canonical,photoRule:'Если код получен с фото, сначала попросить пользователя подтвердить распознанный код символ в символ.',diagnosticRule:'Код синего экрана — отправная точка, а не окончательный диагноз. Для повторяющихся или неясных сбоев использовать параметры ошибки и crash dump/WinDbg !analyze.'};
})();