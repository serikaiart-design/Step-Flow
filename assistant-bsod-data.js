(()=>{
'use strict';
const DETAIL={
'0x0000000a':['IRQL_NOT_LESS_OR_EQUAL','driver-memory','Windows обнаружила недопустимое обращение к памяти на высоком уровне прерываний. Часто расследование приводит к драйверу, но сам код не доказывает, какой именно компонент виноват.','Вспомните последние драйверы и оборудование. Если сбой повторяется, сохраните дамп и не удаляйте случайные драйверы наугад.'],
'0x0000001a':['MEMORY_MANAGEMENT','memory','Windows обнаружила серьёзную ошибку управления памятью. Это не означает автоматически, что неисправна оперативная память.','Если сбой повторяется, запишите код и обстоятельства. Не меняйте сразу BIOS и тайминги памяти.'],
'0x0000001e':['KMODE_EXCEPTION_NOT_HANDLED','driver-kernel','Компонент ядра вызвал исключение, которое Windows не смогла обработать. Причину часто уточняют по параметрам ошибки и дампу.','Запишите код, имя файла на синем экране, если оно есть, и последние изменения драйверов или оборудования.'],
'0x00000024':['NTFS_FILE_SYSTEM','storage','Сбой связан с файловой системой NTFS или вводом-выводом накопителя.','Если Windows загружается, сначала сохраните важные данные, затем проверяйте накопитель.'],
'0x0000003b':['SYSTEM_SERVICE_EXCEPTION','driver-memory','Во время выполнения системной службы произошло исключение. Возможны драйвер, повреждение памяти или системного компонента; название кода не определяет виновника.','Зафиксируйте, после какого действия возникает сбой, и последние изменения драйверов. При повторении нужен дамп.'],
'0x0000004e':['PFN_LIST_CORRUPT','memory','Windows обнаружила повреждение структур, которыми ядро отслеживает страницы физической памяти. Причина может быть программной или аппаратной.','Не делайте вывод о неисправной ОЗУ только по коду. Сначала зафиксируйте повторяемость и последние изменения драйверов/оборудования.'],
'0x00000050':['PAGE_FAULT_IN_NONPAGED_AREA','memory-driver','Windows обратилась к недопустимому адресу системной памяти. Microsoft указывает на неверную или уже освобождённую память; источник нужно устанавливать отдельно.','Вспомните последние драйверы, антивирусное/системное ПО и оборудование. При повторении сохраните дамп для анализа.'],
'0x00000051':['REGISTRY_ERROR','registry-storage','Произошла критическая ошибка реестра Windows. Причина может быть связана с вводом-выводом, повреждением данных или другим системным сбоем.','Если Windows загружается, сначала сохраните важные данные. Не применяйте случайные «чистильщики реестра».'],
'0x0000005a':['CRITICAL_SERVICE_FAILED','boot-system','Критически важная служба Windows не смогла запуститься во время загрузки.','Уточните, возникло ли это после обновления, драйвера или изменения системных файлов. Не переустанавливайте Windows до базовой диагностики.'],
'0x00000074':['BAD_SYSTEM_CONFIG_INFO','configuration','Windows обнаружила критическую проблему с системной конфигурацией.','Уточните, что менялось перед первым сбоем: загрузочные параметры, реестр, обновление, драйвер или оборудование.'],
'0x0000007a':['KERNEL_DATA_INPAGE_ERROR','storage','Windows не смогла корректно получить требуемые данные ядра из хранилища.','Не начинайте с переустановки Windows. Сначала зафиксируйте код и проверьте состояние накопителя.'],
'0x0000007b':['INACCESSIBLE_BOOT_DEVICE','boot','Windows потеряла доступ к системному разделу во время загрузки.','Уточните, не менялись ли BIOS/UEFI, режим контроллера, накопитель или параметры загрузки.'],
'0x0000007e':['SYSTEM_THREAD_EXCEPTION_NOT_HANDLED','driver','Системный поток вызвал исключение, которое Windows не смогла обработать.','Запишите имя файла или драйвера на синем экране и вспомните последние обновления драйверов.'],
'0x0000007f':['UNEXPECTED_KERNEL_MODE_TRAP','kernel-hardware','Ядро получило ловушку, которую не смогло обработать. Для определения причины важны параметры bug check и дамп.','Зафиксируйте повторяемость, разгон/undervolt и последние изменения оборудования или драйверов.'],
'0x0000009f':['DRIVER_POWER_STATE_FAILURE','driver-power','Драйвер не завершил изменение состояния питания за допустимое время.','Уточните, возникает ли сбой при выключении, сне, пробуждении или перезагрузке.'],
'0x000000a5':['ACPI_BIOS_ERROR','firmware','Windows обнаружила проблему ACPI, связанную с BIOS/UEFI или совместимостью прошивки.','Запишите модель ПК и версию BIOS/UEFI. Не прошивайте BIOS вслепую.'],
'0x000000c2':['BAD_POOL_CALLER','driver-memory','Компонент ядра некорректно использовал системный пул памяти. Часто требуется определить вызывающий драйвер по дампу.','Вспомните последние драйверы и системные утилиты. Не используйте автоматические «исправители реестра».'],
'0x000000d1':['DRIVER_IRQL_NOT_LESS_OR_EQUAL','driver','Драйвер попытался обратиться к недопустимой или выгружаемой памяти при слишком высоком IRQL.','Если на экране указано имя драйвера, запишите его. Проверьте официальный драйвер производителя; при повторении анализируйте дамп.'],
'0x000000ef':['CRITICAL_PROCESS_DIED','system-process','Критически важный системный процесс Windows неожиданно завершился, поэтому система остановила работу. Возможны системные файлы, накопитель, драйвер, обновление или оборудование.','Если Windows загружается, сохраните важные данные и вспомните, что менялось перед первым сбоем.'],
'0x00000101':['CLOCK_WATCHDOG_TIMEOUT','cpu-hardware','Ожидаемое прерывание от процессора не было получено вовремя. Точную аппаратную или прошивочную причину нельзя определить только по названию.','Если используется разгон/undervolt, верните штатные параметры. Зафиксируйте температуру и обстоятельства сбоя.'],
'0x00000109':['CRITICAL_STRUCTURE_CORRUPTION','kernel','Windows обнаружила повреждение критической структуры ядра.','Зафиксируйте повторяемость и последние изменения драйверов или системного ПО.'],
'0x0000010e':['VIDEO_MEMORY_MANAGEMENT_INTERNAL','gpu','Внутренняя ошибка подсистемы управления видеопамятью.','Уточните, возникло ли это во время графической нагрузки и менялся ли видеодрайвер.'],
'0x00000113':['VIDEO_DXGKRNL_FATAL_ERROR','gpu','Критическая ошибка графического ядра DirectX.','Запишите обстоятельства сбоя и последние изменения видеодрайвера.'],
'0x00000116':['VIDEO_TDR_FAILURE','gpu','Windows не смогла восстановить видеодрайвер или GPU после тайм-аута.','Уточните, был ли перед сбоем чёрный экран, зависание изображения или нагрузка на GPU.'],
'0x00000119':['VIDEO_SCHEDULER_INTERNAL_ERROR','gpu','Планировщик видеоподсистемы обнаружил критическую ошибку. Причину нужно уточнять по драйверу, дампу и состоянию GPU.','Запишите, возник ли сбой при игре/видео и обновлялся ли видеодрайвер.'],
'0x00000120':['BITLOCKER_FATAL_ERROR','bitlocker','Критическая ошибка компонента BitLocker.','Не публикуйте ключ восстановления BitLocker. Сначала выясните, загружается ли Windows и запрашивается ли ключ.'],
'0x00000124':['WHEA_UNCORRECTABLE_ERROR','hardware','Windows зафиксировала фатальную аппаратную ошибку. По одному коду нельзя определить конкретную деталь.','Если есть разгон или undervolt, верните штатные настройки и зафиксируйте температуру и обстоятельства сбоя.'],
'0x00000133':['DPC_WATCHDOG_VIOLATION','driver-storage','Система обнаружила слишком долго выполнявшуюся операцию ядра; причиной могут быть драйверы или устройства.','Уточните последние изменения драйверов накопителя, чипсета, сети и другого оборудования.'],
'0x00000139':['KERNEL_SECURITY_CHECK_FAILURE','kernel','Ядро обнаружило повреждение критической структуры данных.','Запишите повторяемость и последние изменения драйверов или оборудования. Название кода само по себе не означает вирус.'],
'0x0000013a':['KERNEL_MODE_HEAP_CORRUPTION','driver-memory','Windows обнаружила повреждение кучи памяти ядра. Источник может быть в драйвере или другом низкоуровневом компоненте.','Зафиксируйте последние обновления драйверов и обстоятельства. При повторении нужен crash dump.'],
'0x00000154':['UNEXPECTED_STORE_EXCEPTION','storage-system','Компонент хранения Windows столкнулся с неожиданным исключением. Название не означает автоматически неисправность SSD.','Сохраните важные данные, если система загружается, и проверьте повторяемость, состояние накопителя и последние драйверы/обновления.']
};
const INDEX=`
00000001 APC_INDEX_MISMATCH
00000002 DEVICE_QUEUE_NOT_BUSY
00000003 INVALID_AFFINITY_SET
00000004 INVALID_DATA_ACCESS_TRAP
00000005 INVALID_PROCESS_ATTACH_ATTEMPT
00000006 INVALID_PROCESS_DETACH_ATTEMPT
00000007 INVALID_SOFTWARE_INTERRUPT
00000008 IRQL_NOT_DISPATCH_LEVEL
00000009 IRQL_NOT_GREATER_OR_EQUAL
0000000A IRQL_NOT_LESS_OR_EQUAL
0000000B NO_EXCEPTION_HANDLING_SUPPORT
0000000C MAXIMUM_WAIT_OBJECTS_EXCEEDED
0000000D MUTEX_LEVEL_NUMBER_VIOLATION
0000000E NO_USER_MODE_CONTEXT
0000000F SPIN_LOCK_ALREADY_OWNED
00000010 SPIN_LOCK_NOT_OWNED
00000011 THREAD_NOT_MUTEX_OWNER
00000012 TRAP_CAUSE_UNKNOWN
00000013 EMPTY_THREAD_REAPER_LIST
00000018 REFERENCE_BY_POINTER
00000019 BAD_POOL_HEADER
0000001A MEMORY_MANAGEMENT
0000001E KMODE_EXCEPTION_NOT_HANDLED
00000023 FAT_FILE_SYSTEM
00000024 NTFS_FILE_SYSTEM
0000002E DATA_BUS_ERROR
00000034 CACHE_MANAGER
00000035 NO_MORE_IRP_STACK_LOCATIONS
00000036 DEVICE_REFERENCE_COUNT_NOT_ZERO
00000037 FLOPPY_INTERNAL_ERROR
00000038 SERIAL_DRIVER_INTERNAL
00000039 SYSTEM_EXIT_OWNED_MUTEX
0000003A SYSTEM_UNWIND_PREVIOUS_USER
0000003B SYSTEM_SERVICE_EXCEPTION
0000003C INTERRUPT_UNWIND_ATTEMPTED
0000003D INTERRUPT_EXCEPTION_NOT_HANDLED
0000003E MULTIPROCESSOR_CONFIGURATION_NOT_SUPPORTED
0000003F NO_MORE_SYSTEM_PTES
00000040 TARGET_MDL_TOO_SMALL
00000041 MUST_SUCCEED_POOL_EMPTY
00000042 ATDISK_DRIVER_INTERNAL
00000043 NO_SUCH_PARTITION
00000044 MULTIPLE_IRP_COMPLETE_REQUESTS
00000045 INSUFFICIENT_SYSTEM_MAP_REGS
00000046 DEREF_UNKNOWN_LOGON_SESSION
00000047 REF_UNKNOWN_LOGON_SESSION
00000048 CANCEL_STATE_IN_COMPLETED_IRP
00000049 PAGE_FAULT_WITH_INTERRUPTS_OFF
0000004A IRQL_GT_ZERO_AT_SYSTEM_SERVICE
0000004B STREAMS_INTERNAL_ERROR
0000004C FATAL_UNHANDLED_HARD_ERROR
0000004D NO_PAGES_AVAILABLE
0000004E PFN_LIST_CORRUPT
0000004F NDIS_INTERNAL_ERROR
00000050 PAGE_FAULT_IN_NONPAGED_AREA
00000051 REGISTRY_ERROR
00000052 MAILSLOT_FILE_SYSTEM
00000053 NO_BOOT_DEVICE
00000054 LM_SERVER_INTERNAL_ERROR
00000055 DATA_COHERENCY_EXCEPTION
00000056 INSTRUCTION_COHERENCY_EXCEPTION
00000057 XNS_INTERNAL_ERROR
00000058 FTDISK_INTERNAL_ERROR
00000059 PINBALL_FILE_SYSTEM
0000005A CRITICAL_SERVICE_FAILED
0000005B SET_ENV_VAR_FAILED
0000005C HAL_INITIALIZATION_FAILED
0000005D UNSUPPORTED_PROCESSOR
0000005E OBJECT_INITIALIZATION_FAILED
0000005F SECURITY_INITIALIZATION_FAILED
00000060 PROCESS_INITIALIZATION_FAILED
00000061 HAL1_INITIALIZATION_FAILED
00000062 OBJECT1_INITIALIZATION_FAILED
00000063 SECURITY1_INITIALIZATION_FAILED
00000064 SYMBOLIC_INITIALIZATION_FAILED
00000065 MEMORY1_INITIALIZATION_FAILED
00000066 CACHE_INITIALIZATION_FAILED
00000067 CONFIG_INITIALIZATION_FAILED
00000068 FILE_INITIALIZATION_FAILED
00000069 IO1_INITIALIZATION_FAILED
0000006A LPC_INITIALIZATION_FAILED
0000006B PROCESS1_INITIALIZATION_FAILED
0000006C REFMON_INITIALIZATION_FAILED
0000006D SESSION1_INITIALIZATION_FAILED
0000006E SESSION2_INITIALIZATION_FAILED
0000006F SESSION3_INITIALIZATION_FAILED
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
000000C6 DRIVER_CAUGHT_MODIFYING_FREED_POOL
000000C7 TIMER_OR_DPC_INVALID
000000C8 IRQL_UNEXPECTED_VALUE
000000C9 DRIVER_VERIFIER_IOMANAGER_VIOLATION
000000CA PNP_DETECTED_FATAL_ERROR
000000CB DRIVER_LEFT_LOCKED_PAGES_IN_PROCESS
000000CC PAGE_FAULT_IN_FREED_SPECIAL_POOL
000000CD PAGE_FAULT_BEYOND_END_OF_ALLOCATION
000000CE DRIVER_UNLOADED_WITHOUT_CANCELLING_PENDING_OPERATIONS
000000CF TERMINAL_SERVER_DRIVER_MADE_INCORRECT_MEMORY_REFERENCE
000000D0 DRIVER_CORRUPTED_MMPOOL
000000D1 DRIVER_IRQL_NOT_LESS_OR_EQUAL
000000D2 BUGCODE_ID_DRIVER
000000D3 DRIVER_PORTION_MUST_BE_NONPAGED
000000D4 SYSTEM_SCAN_AT_RAISED_IRQL_CAUGHT_IMPROPER_DRIVER_UNLOAD
000000D5 DRIVER_PAGE_FAULT_IN_FREED_SPECIAL_POOL
000000D6 DRIVER_PAGE_FAULT_BEYOND_END_OF_ALLOCATION
000000D7 DRIVER_UNMAPPING_INVALID_VIEW
000000D8 DRIVER_USED_EXCESSIVE_PTES
000000D9 LOCKED_PAGES_TRACKER_CORRUPTION
000000DA SYSTEM_PTE_MISUSE
000000DB DRIVER_CORRUPTED_SYSPTES
000000DC DRIVER_INVALID_STACK_ACCESS
000000DE POOL_CORRUPTION_IN_FILE_AREA
000000DF IMPERSONATING_WORKER_THREAD
000000E0 ACPI_BIOS_FATAL_ERROR
000000E1 WORKER_THREAD_RETURNED_AT_BAD_IRQL
000000E2 MANUALLY_INITIATED_CRASH
000000E3 RESOURCE_NOT_OWNED
000000E4 WORKER_INVALID
000000E6 DRIVER_VERIFIER_DMA_VIOLATION
000000E7 INVALID_FLOATING_POINT_STATE
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
const byCode={},aliases={};for(const [hex,name] of INDEX){const code='0x'+hex.toLowerCase();byCode[code]=name;aliases[name]=code}for(const [code,d] of Object.entries(DETAIL)){byCode[code]=d[0];aliases[d[0]]=code}
function canonical(v){const s=String(v||'').trim().toUpperCase();if(aliases[s])return aliases[s];const m=s.match(/0X([0-9A-F]{1,8})/);return m?'0x'+m[1].padStart(8,'0').toLowerCase():null}
function card(code,name){const d=DETAIL[code];if(d)return {code,name:d[0],group:d[1],summary:d[2],first:d[3],detail:true};return {code,name:name||byCode[code]||'UNKNOWN_BUG_CHECK',group:'catalog',summary:'Этот код присутствует в локальном каталоге, составленном по официальному справочнику Microsoft Bug Check. По одному коду нельзя надёжно определить первопричину.','first':'Сверьте код символ в символ. Если сбой повторяется, запишите обстоятельства и сохраните crash dump; для углублённой диагностики используйте WinDbg и !analyze.',detail:false}}
function find(text){const raw=String(text||''),up=raw.toUpperCase().replace(/[\s-]+/g,'_');for(const name of Object.keys(aliases)){if(up.includes(name))return card(aliases[name],name)}const m=String(text||'').toUpperCase().match(/0X[0-9A-F]{1,8}/);if(m){const code=canonical(m[0]);return card(code,byCode[code])}return null}
window.StepFlowBSOD={version:'2026-08-25-catalog-v2',source:'Microsoft Learn — Bug Check Code Reference',sourceUrl:'https://learn.microsoft.com/ru-ru/windows-hardware/drivers/debugger/bug-check-code-reference2',db:DETAIL,index:byCode,aliases,count:Object.keys(byCode).length,detailedCount:Object.keys(DETAIL).length,find,canonical,photoRule:'Если код получен с фото, сначала попросить пользователя подтвердить распознанный код символ в символ.',diagnosticRule:'Bug Check — отправная точка, а не окончательный диагноз. Для повторяющихся или неясных сбоев учитывать параметры ошибки и crash dump/WinDbg !analyze.'};
})();