(()=>{
const css=`.sf-help-btn{position:fixed;right:22px;bottom:22px;z-index:9998;border:0;border-radius:999px;padding:14px 18px;background:linear-gradient(135deg,#7c3aed,#8d2df0);color:#fff;font:800 14px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;box-shadow:0 12px 30px rgba(73,44,145,.28);cursor:pointer}.sf-help-panel{position:fixed;right:22px;bottom:82px;z-index:9999;width:min(430px,calc(100vw - 28px));max-height:min(680px,calc(100vh - 110px));display:none;flex-direction:column;background:#fff;border:1px solid rgba(40,49,84,.10);border-radius:24px;box-shadow:0 24px 70px rgba(35,30,78,.22);overflow:hidden;font:14px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;color:#121a31}.sf-help-panel.open{display:flex}.sf-help-head{padding:16px 18px;background:linear-gradient(135deg,#f3edff,#fff3e9);border-bottom:1px solid rgba(40,49,84,.08)}.sf-help-title{font-weight:850;font-size:17px}.sf-help-sub{margin-top:3px;color:#687289;font-size:12px}.sf-help-chat{padding:14px;display:flex;flex-direction:column;gap:10px;overflow:auto;min-height:285px}.sf-msg{max-width:92%;padding:10px 12px;border-radius:15px}.sf-bot{align-self:flex-start;background:#f3f0ff}.sf-user{align-self:flex-end;background:#7c3aed;color:#fff}.sf-actions{display:flex;gap:7px;flex-wrap:wrap;margin-top:9px}.sf-actions button{border:0;border-radius:10px;padding:8px 10px;font:800 12px/1.2 inherit;cursor:pointer}.sf-primary{background:#7c3aed!important;color:#fff!important}.sf-secondary{background:#fff;color:#6234c3;border:1px solid #ddd1f6!important}.sf-help-form{display:flex;gap:8px;padding:12px;border-top:1px solid #eee;background:#fbfbfd}.sf-help-form input{flex:1;min-width:0;border:1px solid #dfe2ea;border-radius:13px;padding:11px 12px;font:inherit;outline:none}.sf-help-form button{border:0;border-radius:13px;padding:0 14px;background:#7c3aed;color:#fff;font-weight:850}.sf-close{float:right;border:0;background:transparent;font-size:19px;cursor:pointer;color:#6c7382}.sf-tag{display:inline-block;margin-bottom:6px;font-size:10px;font-weight:850;text-transform:uppercase;letter-spacing:.4px;color:#6b3bd0}.sf-note{margin-top:7px;font-size:12px;color:#667085}@media(max-width:520px){.sf-help-btn{right:14px;bottom:14px}.sf-help-panel{right:14px;bottom:72px}.sf-help-form{display:grid}.sf-help-form button{padding:11px}}`;
const style=document.createElement('style');style.textContent=css;document.head.appendChild(style);
let session={caseId:null,family:null,state:null,attempted:[]};
const btn=document.createElement('button');btn.className='sf-help-btn';btn.textContent='Помощник';
const panel=document.createElement('section');panel.className='sf-help-panel';panel.innerHTML='<div class="sf-help-head"><button class="sf-close">×</button><div class="sf-help-title">Step & Flow · Помощник</div><div class="sf-help-sub">Один безопасный шаг за раз</div></div><div class="sf-help-chat"><div class="sf-msg sf-bot">Опишите проблему обычными словами. Я не буду угадывать причину — сначала уточню, что именно происходит.</div></div><form class="sf-help-form"><input autocomplete="off" placeholder="Что случилось?"><button>Отправить</button></form>';
document.body.append(btn,panel);
const chat=panel.querySelector('.sf-help-chat'),form=panel.querySelector('form'),input=form.querySelector('input');
const norm=v=>String(v||'').toLowerCase().replace(/ё/g,'е').trim();
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function msg(html,user=false){const d=document.createElement('div');d.className='sf-msg '+(user?'sf-user':'sf-bot');d.innerHTML=html;chat.appendChild(d);chat.scrollTop=chat.scrollHeight;return d}
function buttons(items){const a=document.createElement('div');a.className='sf-actions';items.forEach(([label,value,primary])=>{const b=document.createElement('button');b.type='button';b.className=primary?'sf-primary':'sf-secondary';b.textContent=label;b.onclick=()=>{msg(esc(label),true);handle(value)};a.appendChild(b)});chat.lastElementChild.appendChild(a)}
function start(family,state){session={caseId:'case_'+Date.now(),family,state,attempted:[]};render()}
function move(state){if(session.state)session.attempted.push(session.family+':'+session.state);session.state=state;render()}
function clear(){session={caseId:null,family:null,state:null,attempted:[]}}
function resolved(){msg('<span class="sf-tag">Готово</span><br><b>Проблема исчезла.</b><div class="sf-note">Если всё работает, больше ничего менять не нужно.</div>');clear()}
function currentHelp(text){msg('<b>Мы остаёмся в этой же проблеме.</b><br>'+text+'<div class="sf-note">Если удобнее, опишите, что именно видите на экране.</div>')}
function render(){
 const f=session.family,s=session.state;
 if(f==='slow'){
  if(s==='scope'){msg('<span class="sf-tag">Компьютер работает медленно</span><br>Что именно работает медленно?');buttons([['Весь компьютер','whole'],['Копирование файлов','copy_scope'],['Одна программа','app_switch'],['Запуск Windows','boot'],['Не знаю','scope_help']]);return}
  if(s==='scope_help'){currentHelp('Выберите то, что раздражает больше всего: весь компьютер, копирование файлов, одна программа или запуск Windows.');buttons([['Весь компьютер','whole'],['Копирование файлов','copy_scope'],['Одна программа','app_switch'],['Запуск Windows','boot']]);return}
  if(s==='whole'){msg('Сохраните документы и перезагрузите компьютер обычным способом. После запуска пока не открывайте много программ.');buttons([['Сделал','whole_after_restart',true],['Не понимаю','restart_help']]);return}
  if(s==='restart_help'){currentHelp('Нажмите Пуск → Питание → Перезагрузка. Это обычная перезагрузка, файлы не удаляются.');buttons([['Сделал','whole_after_restart',true],['Не могу перезагрузить','escalate_basic']]);return}
  if(s==='whole_after_restart'){msg('После перезагрузки компьютер всё ещё заметно тормозит?');buttons([['Да','resource'],['Нет','resolved',true],['Не знаю','resource']]);return}
  if(s==='resource'){msg('Нажмите <b>Ctrl + Shift + Esc</b> и откройте Диспетчер задач. Что сильнее всего загружено?');buttons([['Процессор','cpu'],['Память','ram'],['Диск','disk_load'],['Не понимаю','resource_help']]);return}
  if(s==='resource_help'){currentHelp('В Диспетчере задач откройте вкладку «Процессы». Посмотрите на столбцы ЦП, Память и Диск и выберите тот, где значение чаще всего самое высокое.');buttons([['Процессор','cpu'],['Память','ram'],['Диск','disk_load'],['Не вижу','escalate_basic']]);return}
  if(s==='cpu'){msg('Посмотрите, какая программа находится вверху столбца <b>ЦП</b>. Узнаёте её?');buttons([['Да','cpu_known'],['Нет','cpu_unknown'],['Не понимаю','resource_help']]);return}
  if(s==='cpu_known'){msg('Закройте только эту обычную программу, если вы сейчас ей не пользуетесь. Компьютер стал отзывчивее?');buttons([['Да','resolved',true],['Нет','perf_next'],['Не уверен','perf_next']]);return}
  if(s==='cpu_unknown'){msg('Не завершайте незнакомый процесс. Запишите его название — это уже полезный диагностический факт.');buttons([['Записал','perf_next',true],['Не понимаю','resource_help']]);return}
  if(s==='ram'){msg('Посмотрите, какая программа использует больше всего <b>Памяти</b>. Если это обычная программа, которой вы не пользуетесь, закройте её обычным способом. Стало лучше?');buttons([['Да','resolved',true],['Нет','perf_next'],['Не понимаю','resource_help']]);return}
  if(s==='disk_load'){msg('Если столбец <b>Диск</b> долго держится около 90–100%, посмотрите, какой процесс стоит сверху. Не удаляйте и не отключайте ничего.');buttons([['Нашёл процесс','disk_process'],['Диск не 90–100%','perf_next'],['Не понимаю','resource_help']]);return}
  if(s==='disk_process'){msg('Хорошо. Это признак, а не диагноз. Следующий шаг — проверить, повторяется ли высокая нагрузка после 2–3 минут простоя.');buttons([['Да, остаётся высокой','storage_evidence'],['Нет, упала','resolved',true],['Не знаю','perf_next']]);return}
  if(s==='storage_evidence'){msg('Пока не чиним диск. Сначала нужен безопасный read-only факт: свободное место на диске C:. Свободно меньше 15 ГБ?');buttons([['Да','low_space'],['Нет','perf_next'],['Не знаю','space_help']]);return}
  if(s==='space_help'){currentHelp('Откройте Проводник → «Этот компьютер». Под диском C: видно, сколько свободного места осталось.');buttons([['Меньше 15 ГБ','low_space'],['Больше 15 ГБ','perf_next'],['Не вижу','escalate_basic']]);return}
  if(s==='low_space'){msg('Недостаток свободного места может заметно замедлять Windows. Сначала удалим только очевидные временные файлы через Параметры → Система → Память.');buttons([['Сделал, стало лучше','resolved',true],['Не помогло','perf_next'],['Не понимаю','space_help']]);return}
  if(s==='perf_next'){msg('Базовая проверка не дала однозначной причины. Следующий уровень — история надёжности/события и конкретный процесс, а не случайные «оптимизаторы».');buttons([['Продолжить','escalate_basic',true],['Закончить','resolved']]);return}
  if(s==='copy_scope'){msg('<span class="sf-tag">Медленное копирование</span><br>Куда именно вы копируете файлы?');buttons([['Внутри компьютера','internal'],['На флешку / USB-диск','usb'],['По сети','network_copy'],['В облако','cloud'],['Не знаю','copy_help']]);return}
  if(s==='copy_help'){currentHelp('Если кабель/флешка вставлены в USB — выберите USB. Если копируете на другой компьютер дома/в офисе — «По сети». OneDrive/Google Drive/Dropbox — «В облако».');buttons([['Внутри компьютера','internal'],['На USB','usb'],['По сети','network_copy'],['В облако','cloud']]);return}
  if(s==='internal'){msg('Копируете <b>с одного диска на другой</b> или <b>внутри одного и того же диска</b>?');buttons([['На другой диск','other_drive'],['На тот же диск','same_drive'],['Не знаю','copy_help']]);return}
  if(s==='other_drive'){msg('Скорость может ограничивать любой из двух дисков. Сначала проверьте свободное место на диске, <b>куда</b> копируете. Там меньше 15 ГБ?');buttons([['Да','low_space_copy'],['Нет','copy_filetype'],['Не знаю','space_help_copy']]);return}
  if(s==='same_drive'){msg('Копирование внутри одного диска часто медленнее, особенно если много мелких файлов. Это происходит с одним большим файлом тоже?');buttons([['Да','copy_filetype'],['Нет, только много мелких','small_files'],['Не знаю','copy_filetype']]);return}
  if(s==='usb'){msg('Попробуйте другой USB-разъём на компьютере. Скорость заметно изменилась?');buttons([['Да, быстрее','resolved',true],['Нет, так же','usb_next'],['Не понимаю','usb_help']]);return}
  if(s==='usb_help'){currentHelp('Просто выньте флешку/диск безопасно и подключите в другой USB-порт. Ничего устанавливать не нужно.');buttons([['Сделал — быстрее','resolved',true],['Сделал — так же','usb_next'],['Не могу','escalate_basic']]);return}
  if(s==='usb_next'){msg('Теперь важно понять ограничение устройства: другой файл похожего размера копируется так же медленно?');buttons([['Да','usb_device_test'],['Нет','copy_filetype'],['Не знаю','usb_device_test']]);return}
  if(s==='usb_device_test'){msg('Если возможно, попробуйте эту же флешку/диск на другом компьютере. Там тоже медленно?');buttons([['Да','usb_likely_device'],['Нет','usb_pc_branch'],['Не могу проверить','escalate_basic']]);return}
  if(s==='usb_likely_device'){msg('Похоже, ограничение связано с самим USB-накопителем или его состоянием. Не форматируем его. Если есть важные файлы — сначала резервная копия.');buttons([['Есть важные файлы','backup_first'],['Важных файлов нет','vendor_storage'],['Закончить','resolved']]);return}
  if(s==='usb_pc_branch'){msg('На другом ПК быстрее — значит, исследуем USB-контроллер/драйвер этого компьютера, а не сам накопитель.');buttons([['Продолжить','escalate_basic',true],['Закончить','resolved']]);return}
  if(s==='network_copy'){msg('Копирование идёт между устройствами в одной домашней/рабочей сети?');buttons([['Да','network_local'],['Нет, через интернет','cloud'],['Не знаю','copy_help']]);return}
  if(s==='network_local'){msg('Проверьте: оба устройства подключены по Wi‑Fi или одно по кабелю Ethernet?');buttons([['Оба Wi‑Fi','wifi_copy'],['Есть Ethernet','lan_copy'],['Не знаю','escalate_basic']]);return}
  if(s==='wifi_copy'){msg('Wi‑Fi сам по себе может быть ограничением. Для проверки переместите устройства ближе к роутеру и повторите копирование. Быстрее?');buttons([['Да','resolved',true],['Нет','escalate_basic'],['Не могу проверить','escalate_basic']]);return}
  if(s==='lan_copy'){msg('Если есть Ethernet, сеть обычно не должна быть главным узким местом. Следующий шаг — измерить, какой из дисков или процессов ограничивает копирование.');buttons([['Продолжить','escalate_basic',true],['Закончить','resolved']]);return}
  if(s==='cloud'){msg('Медленно только <b>загружается</b> в облако или и скачивается тоже?');buttons([['Только загружается','upload'],['И туда и обратно','both'],['Не знаю','cloud_help']]);return}
  if(s==='cloud_help'){currentHelp('Загрузка — когда файл уходит с вашего компьютера в облако. Скачивание — когда файл приходит из облака на компьютер.');buttons([['Только загрузка','upload'],['Оба направления','both']]);return}
  if(s==='upload'){msg('Тогда первым кандидатом является скорость отдачи интернета, а не SSD. Проверьте обычный интернет: сайты/видео работают нормально?');buttons([['Да','cloud_uplink'],['Нет','network_switch'],['Не знаю','network_switch']]);return}
  if(s==='both'){msg('Если медленно в обе стороны, сначала проверяем интернет/сеть.');buttons([['Продолжить','network_switch',true],['Закончить','resolved']]);return}
  if(s==='cloud_uplink'){msg('Сайты могут работать нормально даже при медленной отдаче. Следующий шаг — сетевой тест/диагностика, а не проверка диска.');buttons([['Продолжить','network_switch',true],['Закончить','resolved']]);return}
  if(s==='copy_filetype'){msg('Это один большой файл (например видео) или много мелких файлов?');buttons([['Один большой','large_file'],['Много мелких','small_files'],['Не знаю','escalate_basic']]);return}
  if(s==='large_file'){msg('Если один большой файл копируется медленно, уже имеет смысл сравнивать реальную скорость источника и назначения. Это следующий диагностический уровень.');buttons([['Продолжить','escalate_basic',true],['Закончить','resolved']]);return}
  if(s==='small_files'){msg('Много мелких файлов копируются заметно медленнее из-за большого количества операций. Это может быть нормальным поведением, а не поломкой диска.');buttons([['Понятно','resolved',true],['Всё равно слишком медленно','escalate_basic']]);return}
  if(s==='low_space_copy'){msg('На диске назначения мало свободного места. Освободите немного места безопасным способом и повторите копирование.');buttons([['Стало быстрее','resolved',true],['Не помогло','copy_filetype'],['Не понимаю','space_help_copy']]);return}
  if(s==='space_help_copy'){currentHelp('Откройте «Этот компьютер» и найдите диск, куда копируете. Под ним видно свободное место.');buttons([['Меньше 15 ГБ','low_space_copy'],['Больше 15 ГБ','copy_filetype'],['Не вижу','escalate_basic']]);return}
  if(s==='backup_first'){msg('Сначала скопируйте самые важные файлы на другой исправный диск или в облако. После этого можно продолжать диагностику накопителя.');buttons([['Резервная копия готова','vendor_storage',true],['Не получается скопировать','escalate_basic']]);return}
  if(s==='vendor_storage'){msg('Теперь нужен read-only тест здоровья накопителя официальной утилитой производителя или проверенным SMART-инструментом. Ремонт/форматирование пока не запускаем.');buttons([['Продолжить','escalate_basic',true],['Закончить','resolved']]);return}
  if(s==='boot'){start('boot','stage');return}
  if(s==='app_switch'){start('app_hang','ask');return}
 }
 if(f==='app_hang'){
  if(s==='ask'){msg('<span class="sf-tag">Программа зависла</span><br>Она не отвечает и не закрывается обычным способом?');buttons([['Да','wait'],['Нет','app_other'],['Не знаю','wait']]);return}
  if(s==='wait'){msg('Подождите 30–60 секунд. Иногда программа занята и снова начинает отвечать.');buttons([['Заработала','resolved',true],['Не помогло','taskmgr'],['Не понимаю','wait_help']]);return}
  if(s==='wait_help'){currentHelp('Пока ничего не нажимайте 30–60 секунд. Если окно снова реагирует — выберите «Заработала».');buttons([['Заработала','resolved',true],['Не помогло','taskmgr']]);return}
  if(s==='taskmgr'){msg('Нажмите <b>Ctrl + Shift + Esc</b>. В Диспетчере задач выберите зависшую программу и нажмите <b>«Снять задачу»</b>.');buttons([['Сделал','reopen',true],['Не получилось','taskmgr_help'],['Не понимаю','taskmgr_help']]);return}
  if(s==='taskmgr_help'){currentHelp('Ctrl + Shift + Esc открывает Диспетчер задач. Найдите только зависшую программу по названию. Системные процессы не трогаем.');buttons([['Получилось','reopen',true],['Не могу найти','app_escalate']]);return}
  if(s==='reopen'){msg('Запустите программу снова. Она снова зависает?');buttons([['Да','repeat'],['Нет','resolved',true],['Не знаю','repeat']]);return}
  if(s==='repeat'){msg('Зависание повторяется. Теперь диагностируем именно эту программу: обновление, её настройки и событие в истории надёжности.');buttons([['Продолжить','app_escalate',true],['Закончить','resolved']]);return}
  if(s==='app_other'){msg('Тогда уточните: программа закрывается, но работает неправильно, или вообще не запускается?');buttons([['Работает неправильно','app_escalate'],['Не запускается','app_escalate'],['Не знаю','app_escalate']]);return}
  if(s==='app_escalate'){msg('Базовый безопасный сценарий завершён. Следующий уровень — данные именно этой программы и история надёжности Windows, без переустановки системы.');buttons([['Закончить','resolved',true]]);return}
 }
 if(f==='network'){
  if(s==='scope'){msg('<span class="sf-tag">Нет интернета / Wi‑Fi</span><br>На телефоне, подключённом к тому же Wi‑Fi, интернет работает?');buttons([['Да','pc_only'],['Нет','router'],['Не знаю','router']]);return}
  if(s==='router'){msg('Перезагрузите роутер: выключите питание на 20 секунд, включите и подождите 2–3 минуты.');buttons([['Помогло','resolved',true],['Не помогло','router_failed'],['Не понимаю','router_help']]);return}
  if(s==='router_help'){currentHelp('Отключите питание роутера из розетки на 20 секунд, затем включите обратно и подождите, пока загорятся обычные индикаторы.');buttons([['Помогло','resolved',true],['Не помогло','router_failed'],['Не могу','network_escalate']]);return}
  if(s==='router_failed'){msg('Продолжаем ту же проблему. Значок Wi‑Fi рядом с часами на компьютере есть?');buttons([['Да','wifi_present'],['Нет','wifi_missing'],['Не знаю','wifi_help']]);return}
  if(s==='pc_only'){msg('Интернет на других устройствах есть — значит, сначала проверяем только этот компьютер. Значок Wi‑Fi рядом с часами есть?');buttons([['Да','wifi_present'],['Нет','wifi_missing'],['Не знаю','wifi_help']]);return}
  if(s==='wifi_help'){currentHelp('Посмотрите справа внизу рядом с часами. Ищите значок беспроводной сети/глобуса.');buttons([['Значок Wi‑Fi есть','wifi_present'],['Нет Wi‑Fi','wifi_missing'],['Не вижу','network_escalate']]);return}
  if(s==='wifi_present'){msg('Нажмите значок Wi‑Fi. Компьютер подключён к вашей сети и написано «Подключено»?');buttons([['Да','connected_no_internet'],['Нет','reconnect_wifi'],['Не знаю','wifi_help']]);return}
  if(s==='reconnect_wifi'){msg('Выберите свою сеть Wi‑Fi и подключитесь к ней заново. Интернет появился?');buttons([['Да','resolved',true],['Нет','get_help_network'],['Не получается подключиться','get_help_network']]);return}
  if(s==='connected_no_internet'){msg('Подключение к Wi‑Fi есть, но интернета нет. Следующий безопасный шаг — встроенная диагностика Windows «Получить помощь» для сети.');buttons([['Продолжить','get_help_network',true],['Закончить','resolved']]);return}
  if(s==='wifi_missing'){msg('Значка Wi‑Fi нет. Не делаем сброс сети. Сначала проверяем, видит ли Windows Wi‑Fi-адаптер в Диспетчере устройств.');buttons([['Продолжить','device_manager_wifi',true],['Не понимаю','device_help']]);return}
  if(s==='device_help'){currentHelp('Нажмите правой кнопкой по Пуск → Диспетчер устройств → Сетевые адаптеры. Ничего не удаляйте.');buttons([['Открыл','device_manager_wifi',true],['Не могу открыть','network_escalate']]);return}
  if(s==='device_manager_wifi'){msg('В разделе «Сетевые адаптеры» есть беспроводной/Wi‑Fi адаптер или устройство с жёлтым значком?');buttons([['Wi‑Fi адаптер есть','adapter_present'],['Есть жёлтый значок','adapter_error'],['Wi‑Fi адаптера нет','adapter_missing'],['Не понимаю','device_help']]);return}
  if(s==='adapter_present'){msg('Адаптер виден. Следующий шаг — встроенная диагностика Windows и состояние драйвера, а не переустановка системы.');buttons([['Продолжить','get_help_network',true],['Закончить','resolved']]);return}
  if(s==='adapter_error'){msg('Жёлтый значок — важный технический признак. Откройте свойства адаптера и запишите код состояния устройства, например Code 10/31/43.');buttons([['Код записан','network_escalate',true],['Не понимаю','device_help']]);return}
  if(s==='adapter_missing'){msg('Windows не видит Wi‑Fi-адаптер. Это уже отдельная ветка: драйвер, отключённое устройство или аппаратная проблема. Не запускаем случайные reset-команды.');buttons([['Продолжить','network_escalate',true],['Закончить','resolved']]);return}
  if(s==='get_help_network'){msg('Откройте приложение <b>«Получить помощь» (Get Help)</b> и запустите диагностику сети. После неё напишите, нашла ли Windows проблему.');buttons([['Нашла проблему','network_escalate'],['Ничего не нашла','network_escalate'],['Не могу запустить','network_escalate']]);return}
  if(s==='network_escalate'){msg('Базовая безопасная ветка завершена. Дальше нужны структурированные факты: адаптер, драйвер, IP/DNS и возможная известная проблема Windows.');buttons([['Закончить','resolved',true]]);return}
 }
 if(f==='boot'){
  if(s==='stage'){msg('<span class="sf-tag">Windows не загружается</span><br>Что вы видите после включения?');buttons([['Вообще нет изображения','no_display'],['Логотип производителя / ошибка Boot','preboot'],['Логотип Windows и крутится','windows_loading'],['Синий экран','bsod'],['Чёрный экран после логотипа','black_after_logo'],['Не знаю','boot_help']]);return}
  if(s==='boot_help'){currentHelp('Выберите самый похожий вариант. Нам важно понять, на каком этапе останавливается загрузка.');buttons([['Нет изображения','no_display'],['Ошибка Boot','preboot'],['Логотип Windows','windows_loading'],['Синий экран','bsod'],['Чёрный экран','black_after_logo']]);return}
  if(s==='no_display'){msg('Если изображения нет вообще, это уже не типичная проблема Windows. Проверяем питание/экран/кабель и аппаратный запуск, а не WinRE.');buttons([['Закончить','resolved',true],['Продолжить позже','resolved']]);return}
  if(s==='preboot'){msg('Если видите Boot/No boot device/BCD-подобную ошибку, сначала используем Windows Recovery Environment, если она доступна, и Startup Repair.');buttons([['WinRE открывается','startup_repair'],['WinRE не открывается','boot_escalate'],['Не знаю','winre_help']]);return}
  if(s==='windows_loading'||s==='black_after_logo'){msg('Windows начинает загружаться, значит сначала пробуем встроенную среду восстановления WinRE и <b>Восстановление при загрузке</b>.');buttons([['WinRE открывается','startup_repair'],['Не открывается','boot_escalate'],['Не понимаю','winre_help']]);return}
  if(s==='winre_help'){currentHelp('После нескольких неудачных запусков Windows часто сама открывает «Автоматическое восстановление». Там выберите Дополнительные параметры → Устранение неполадок.');buttons([['Открылось','startup_repair',true],['Не открывается','boot_escalate']]);return}
  if(s==='startup_repair'){msg('Выберите <b>Дополнительные параметры → Восстановление при загрузке</b>. Этот шаг не должен удалять личные файлы. Если появится запрос BitLocker — не угадывайте ключ.');buttons([['Windows загрузилась','resolved',true],['Не помогло','startup_failed'],['Просит BitLocker','bitlocker_gate'],['Не вижу пункта','boot_escalate']]);return}
  if(s==='bitlocker_gate'){msg('Остановимся здесь. Для продолжения нужен настоящий ключ восстановления BitLocker. Не подбирайте его и не отключайте защиту случайными командами.');buttons([['Ключ есть','startup_repair'],['Ключа нет','boot_escalate']]);return}
  if(s==='startup_failed'){msg('Startup Repair не помог. Дальше не переустанавливаем Windows сразу: проверяем известные проблемы/обновления и доступные recovery-возможности для вашей версии Windows.');buttons([['Продолжить','boot_escalate',true],['Закончить','resolved']]);return}
  if(s==='bsod'){msg('Синий экран — это отдельная ветка. Запишите Stop Code, если он виден. Код — признак, а не готовый диагноз.');buttons([['Код записан','boot_escalate',true],['Кода нет','boot_escalate'],['Не успеваю увидеть','boot_escalate']]);return}
  if(s==='boot_escalate'){msg('Базовый boot-flow завершён. Следующий уровень: Windows build/KB, Known Issue Resolver, Quick Machine Recovery/rollback при наличии и только потом более серьёзное восстановление.');buttons([['Закончить','resolved',true]]);return}
 }
 if(s==='escalate_basic'){msg('На этом этапе нужен следующий уровень диагностики по фактам, а не случайные команды. Базовый безопасный сценарий завершён.');buttons([['Закончить','resolved',true]]);return}
 msg('<b>Я сохранил текущую проблему, но для этого состояния ещё нет безопасного следующего шага.</b><div class="sf-note">Случай не сброшен. Опишите, что вы видите, и я останусь в этой же ветке.</div>');
}
function clarify(){msg('<b>Нужно одно уточнение.</b><br>Что именно происходит?');buttons([['Компьютер не включается','clarify_power'],['Windows не загружается','start_boot'],['Работает медленно','start_slow'],['Зависает программа','start_app'],['Нет интернета','start_network'],['Нет звука','clarify_audio'],['Не знаю — помоги определить','clarify_unknown']])}
function handle(v){const x=norm(v);
 if(/дым|запах.{0,8}гар|искр|жидкост/.test(x)){msg('<b>Остановите диагностику.</b><br>Выключите компьютер и отключите питание, если это безопасно.');clear();return}
 if(v==='resolved'){resolved();return}
 if(v==='start_slow'||v==='slow'){start('slow','scope');return}
 if(v==='start_app'){start('app_hang','ask');return}
 if(v==='start_network'||v==='network_switch'){start('network','scope');return}
 if(v==='start_boot'||v==='boot'){start('boot','stage');return}
 if(v==='app_switch'){start('app_hang','ask');return}
 if(v==='clarify_power'){msg('Уточните: при нажатии кнопки питания вообще нет света/вентиляторов или компьютер включается, но экран чёрный?');return}
 if(v==='clarify_audio'){msg('Проблему со звуком я пока не буду угадывать. В рабочем ядре эта ветка будет подключена после P0-сценариев.');return}
 if(v==='clarify_unknown'){msg('Начнём с самого простого: компьютер включается и вы видите рабочий стол Windows?');return}
 if(session.caseId){
  const map={
   'slow:scope':{whole:'whole',copy_scope:'copy_scope',copy:'copy_scope',app_switch:'app_switch',boot:'boot',scope_help:'scope_help',unknown:'scope_help'},
  };
  if(session.family==='slow'&&session.state==='scope'){move(v);return}
  if(session.family==='slow'&&session.state==='boot'){start('boot','stage');return}
  if(session.family==='slow'&&['copy_scope','internal','usb','usb_next','usb_device_test','network_copy','network_local','wifi_copy','lan_copy','cloud','upload','both','cloud_uplink','copy_filetype','large_file','small_files','other_drive','same_drive','low_space_copy','backup_first','vendor_storage','whole','whole_after_restart','resource','cpu','cpu_known','cpu_unknown','ram','disk_load','disk_process','storage_evidence','low_space','perf_next','scope_help','copy_help','restart_help','resource_help','space_help','space_help_copy','usb_help','cloud_help'].includes(session.state)){move(v);return}
  if(session.family==='app_hang'){move(v);return}
  if(session.family==='network'){move(v);return}
  if(session.family==='boot'){move(v);return}
  if(/не помог|не получилось|так же|все равно|не понимаю|не знаю/.test(x)){currentHelp('Я не сбрасываю диагностику. Опишите результат последнего шага чуть подробнее.');return}
 }
 if(/комп.*не работ|ничего не работ|все не работ/.test(x)){clarify();return}
 if(/копир.*медлен|медлен.*копир/.test(x)){start('slow','copy_scope');return}
 if(/медлен|тормоз|лага|подвиса/.test(x)){start('slow','scope');return}
 if(/программ.*завис|приложен.*завис|не закрыва|не отвечает/.test(x)){start('app_hang','ask');return}
 if(/нет интернета|wi.?fi|вай.?фай|пропал.*сеть|сеть.*пропал/.test(x)){start('network','scope');return}
 if(/windows.*не загружа|не грузится windows|boot error|no boot/.test(x)){start('boot','stage');return}
 clarify();
}
btn.onclick=()=>{panel.classList.toggle('open');if(panel.classList.contains('open'))setTimeout(()=>input.focus(),50)};
panel.querySelector('.sf-close').onclick=()=>panel.classList.remove('open');
form.onsubmit=e=>{e.preventDefault();const q=input.value.trim();if(!q)return;msg(esc(q),true);input.value='';handle(q)};
})();