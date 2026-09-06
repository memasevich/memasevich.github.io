import type { SiteContent } from '../../components/site-page';

export const ru: SiteContent = {
  locale: 'ru',
  nav: { works: 'Работы', about: 'Обо мне', resume: 'Резюме', games: 'Симуляции', contact: 'Контакты' },
  identity: 'root@memasevich:~$ whoami',
  heroTitle: 'MEMASEVICH\nСИСАДМИН / DEVOPS\nРАЗРАБОТЧИК',
  heroLead: 'Проектирую и поддерживаю инфраструктуру, автоматизирую процессы, создаю инструменты для реверс-инжиниринга и сложной локализации игр.',
  primaryCta: 'Смотреть работы',
  toolsTitle: 'Прикладная разработка',
  toolsIntro: 'Практические решения, сервисы автоматизации и мультимодельные ИИ-системы. Подтверждённые задачи, архитектура и воспроизводимый результат.',
  tools: [
    {
      title: 'FOOTLIVESTATS / ИИ-СТАТИСТ',
      type: 'AI / SPORTS ANALYTICS / PRIVATE',
      role: 'Архитектура системы, live-сбор данных, мультимодельный ИИ-пайплайн',
      task: 'Непрерывный сбор live-статистики футбольных матчей, расчет fair odds / EV и выдача предиктивного анализа с высокой проходимостью.',
      done: 'Проект стартовал как Telegram-бот (@botstavki) и эволюционировал в комплексный аналитический сервис. Ансамбль нейросетей Claude, ChatGPT, DeepSeek, Kimi 3 и GLM 5.3 с детерминированными код-гейтами фильтрации. Выдает глубокую тактическую аналитику и обеспечивает 86–89% побед еженедельно.',
      status: 'в продакшене / приватный доступ',
      accent: 'lime',
      featured: true,
      highlightMetric: '86–89% ПОБЕД В НЕДЕЛЮ',
      tags: ['Claude', 'ChatGPT', 'DeepSeek', 'Kimi 3', 'GLM 5.3', 'Telegram Bot API', 'Python', 'Live Analytics', 'Data Aggregation'],
      gallery: [
        {
          src: '/projects/footlivestats-signals.png',
          alt: 'FootLiveStats — журнал live-сигналов и верификация исходов',
          label: 'SCREEN_01 // ЖУРНАЛ СИГНАЛОВ (604/7D)',
          desc: 'Сводка верифицированных сигналов бота за 7 дней (604 события с подтверждённым исходом). Код-гейты отсекают шумы, обеспечивая стабильную проходимость 86–89% в неделю.',
        },
        {
          src: '/projects/footlivestats-chart.png',
          alt: 'FootLiveStats — динамика линии тотала и котировок',
          label: 'SCREEN_02 // ДВИЖЕНИЕ ЛИНИИ И ЦЕН',
          desc: 'Синхронный мониторинг движения линии тотала (жёлтая кривая) и коэффициентов на ТБ в реальном времени. Мгновенная фиксация просадки и Value-исходов.',
        },
        {
          src: '/projects/footlivestats-ai.png',
          alt: 'FootLiveStats — тактический разбор модуля Надзиратель',
          label: 'SCREEN_03 // ИИ-АНАЛИЗАТОР «НАДЗИРАТЕЛЬ»',
          desc: 'Модуль глубокого анализа на базе ансамбля Claude, ChatGPT, DeepSeek, Kimi 3 и GLM 5.3: сопоставление прематч-модели и текущего темпа игры для точечных прогнозов.',
        },
      ],
    },
    {
      title: 'ЗАЩИТНИК ДЛЯ ТСД (TSD GUARD)',
      type: 'ANDROID / KOTLIN / HARDWARE / INTERNAL',
      role: 'Архитектура Android-сервиса, интеграция с датчиками Zebra / Honeywell',
      task: 'Предотвращение утраты, краж и механических повреждений дорогостоящих промышленных терминалов сбора данных на распределительном центре.',
      done: 'Разработан нативный фоновый Android-сервис на Kotlin. В реальном времени считывает данные аппаратных датчиков приближения, оптических сенсоров чехла и гироскопа. Если ТСД вынимают из защитного чехла или оставляют неподвижным вне поста — мгновенно блокирует интерфейс, активирует громкий стробоскопический сигнал тревоги и шлёт телеметрию по Wi-Fi на пост мониторинга. Снизило бой и потери устройств более чем на 70%.',
      status: 'внутренний прод / закрытый код',
      href: 'https://github.com/memasevich/memasevich',
      accent: 'violet',
      tags: ['Android', 'Kotlin', 'Hardware Sensors', 'Zebra EMDK', 'Honeywell SDK', 'Background Daemon', 'Loss Prevention']
    },
    {
      title: 'МОДУЛЬ СКАНИРОВАНИЯ WMS (BARCODE ENGINE)',
      type: 'WMS / C# / .NET / ERP INTEGRATION',
      role: 'Реверс-инжиниринг ядра, разработка собственного движка, интеграция с 1С',
      task: 'Заменить закрытое, медленное и сбоящее стороннее решение GS Code в корпоративной системе управления складом (WMS).',
      done: 'С нуля спроектирован высокоскоростной движок обработки штрихкодов на C#/.NET. Поддерживает потоковое декодирование форматов Code128, DataMatrix (Честный Знак), GS1-128 и EAN-13 с мгновенной валидацией номенклатуры в памяти. Прямая асинхронная шина обмена с 1С:Предприятие сократила задержку отклика терминала с 800 мс до 45 мс, исключив простои конвейера и убрав лицензионные отчисления стороннему вендору.',
      status: 'внутренний прод / закрытый код',
      href: 'https://github.com/memasevich/memasevich',
      accent: 'coral',
      tags: ['C#', '.NET', 'WMS Core', 'Barcode Engine', 'DataMatrix GS1', '1C:Enterprise', 'Low Latency', 'Reverse Engineering']
    }
  ],
  localizationTitle: 'Игровые локализации',
  localizationIntro: 'Три масштабных проекта из профиля — с реальными изображениями, версиями, архитектурой движков и ссылками из GitHub и Steam Workshop.',
  localizations: [
    {
      title: 'Caves of Qud',
      area: 'C# / Harmony / Морфологический движок',
      description: 'Полномасштабная адаптация культового научно-фантастического рогалика (166 000+ строк). Собственный морфологический движок для процедурной генерации текстов с динамическим согласованием родов и падежей существительных и прилагательных.',
      status: 'v1.0.6 / актуальная игра 2.0.211.x',
      href: 'https://github.com/memasevich/CoQ-ru-translate-public',
      note: 'SOURCE: GITHUB / RussianLocalization/preview.png',
      image: '/projects/coq-localization.png',
      imageAlt: 'Русская локализация Caves of Qud — изображение из репозитория проекта',
      tags: ['C#', 'Harmony Hooks', 'Procedural Grammar', 'Morphology Engine', '166k+ Strings', 'Steam Workshop', 'DumpMissingStrings'],
      highlights: [
        '166 000+ строк текста и регулярных паттернов: полный перевод диалогов, книг истории, сотен артефактов и мутаций.',
        'Морфологический движок (forms_dictionary & stem_dictionary): падежное согласование динамических существительных и прилагательных.',
        'Защита игровой разметки: сохранение синтаксиса встроенных цветовых тегов и горячих клавиш интерфейса.',
        'Встроенный трекер непереведённых строк: автосбор отсутствующих фраз в Documents/CavesOfQud_RU_Logs для оперативных хотфиксов.',
        'Универсальная установка: поддержка Steam Workshop (id 3728849656) и автономная ручная инъекция для GOG / DRM-free.'
      ],
      links: [
        { label: 'Steam Workshop', href: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3728849656', badge: 'WORKSHOP' },
        { label: 'GitHub Репозиторий', href: 'https://github.com/memasevich/CoQ-ru-translate-public', badge: 'OPEN SOURCE' },
        { label: 'Boosty Патчноуты', href: 'https://boosty.to/memasevich', badge: 'CHANGELOG' }
      ]
    },
    {
      title: 'R.E.P.O.',
      area: 'StreamingAssets / Трёхуровневая TSV-схема / Кириллица',
      description: 'Полная качественная локализация кооперативного хоррор-шутера R.E.P.O. (Semiwork). Интеграция в нативную подсистему локализации игры через три независимые TSV-таблицы без изменения бинарников и риска конфликтов.',
      status: 'репозиторий / 100% контента',
      href: 'https://github.com/memasevich/repo-russianlocalization',
      note: 'SOURCE: STEAM GUIDE / PUBLIC COVER',
      image: '/projects/repo-localization.jpg',
      imageAlt: 'Обложка публичного руководства по русской локализации R.E.P.O.',
      tags: ['StreamingAssets', 'TSV Architecture', '100% Контент', 'Game/HUD/Menu', 'Font Glyph Styling'],
      highlights: [
        'Трёхуровневый пайплайн: разделение переводов на Game.tsv (предметы и монстры), HUD.tsv (скафандр) и Menu.tsv (настройки).',
        '100% покрытие игры: адаптация терминологии терминалов, всех описаний лора, обучающего курса и сетевых сообщений.',
        'Аутентичный стиль шрифтов: полная поддержка кириллических глифов в оригинальном мрачном sci-fi стиле игры.',
        'Чистая установка: простая замена файлов в StreamingAssets/Localizations без риска бана античитом.'
      ],
      links: [
        { label: 'GitHub Репозиторий', href: 'https://github.com/memasevich/repo-russianlocalization', badge: 'OPEN SOURCE' }
      ]
    },
    {
      title: 'Gnomoria',
      area: 'C# / XNA Dynamic Hook / Mono.Cecil / 0Harmony',
      description: 'Революционный русификатор нового поколения Dynamic Engine v0.6.0. Перехватывает системные методы отрисовки графического движка XNA на лету, обеспечивая динамический рендеринг кириллицы без перерисовки оригинальных XNB-архивов.',
      status: 'репозиторий / Dynamic Engine v0.6.0',
      href: 'https://github.com/memasevich/Gnomoria-Russian-Translation',
      note: 'SOURCE: GITHUB / images/in_game_menu.png',
      image: '/projects/gnomoria-localization.png',
      imageAlt: 'Русское меню Gnomoria — скриншот из репозитория проекта',
      tags: ['C#', 'XNA Intercept', 'Mono.Cecil', '0Harmony', 'Patcher.exe', '12 253 Записи', 'Dynamic Parsing'],
      highlights: [
        'Динамический перехват XNA: полный отказ от перерисовки текстур шрифтов и архивов XNB — перехват текста прямо в пайплайне рендера.',
        'Инъектор Patcher.exe: утилита на Mono.Cecil для моментальной инъекции загрузчика хуков в Gnomoria.exe с автобекапом.',
        'Контекстный парсер грамматики: алгоритмический перевод составных названий предметов («copper felling axe» → «лесорубный топор (медь)»).',
        '12 253 словарных записи: полный перевод меню, параметров гномов, боевых логов, динамических жидкостей и статусов крепости.'
      ],
      links: [
        { label: 'GitHub Репозиторий', href: 'https://github.com/memasevich/Gnomoria-Russian-Translation', badge: 'OPEN SOURCE' },
        { label: 'Релизы и сборки', href: 'https://github.com/memasevich/Gnomoria-Russian-Translation/releases', badge: 'RELEASES' }
      ]
    }
  ],
  favoriteGamesTitle: 'СИСТЕМНОЕ МЫШЛЕНИЕ И СИМУЛЯЦИИ',
  favoriteGamesIntro: 'Сложные симуляторы и инженерные песочницы как полигон для отработки балансировки потоков данных, логистики очередей и архитектурного планирования. Суммарный опыт — 7500+ часов.',
  favoriteGames: [
    { title: 'RimWorld', desc: 'Управление колонией, логистика и выживание', img: '/games/rimworld.jpg', playtime: '3000 ч.' },
    { title: 'Satisfactory', desc: 'Масштабная автоматизация и фабрики', img: '/games/satisfactory.jpg', playtime: '2500 ч.' },
    { title: 'Gnomoria', desc: 'Глубокий менеджмент и микроконтроль', img: '/games/gnomoria.jpg', playtime: '1000 ч.' },
    { title: 'Melvor Idle', desc: 'Оптимизация процессов и idle-экономика', img: '/games/melvor-idle.jpg', playtime: '1000 ч.' },
  ],
  aboutTitle: 'ОПЕРАТОР СИСТЕМЫ',
  aboutText: [
    'Технический бэкграунд с раннего возраста. Изучение аппаратного обеспечения, сборка и диагностика ПК, глубокое погружение в принципы работы ОС. Переход от пользователя к исследователю архитектуры систем.',
    'Развертывание первых серверов и веб-проектов. Практические эксперименты с хостингами, сетями и базами данных. Параллельное освоение реверс-инжиниринга и модификации клиентских файлов.',
    'Систематизация инженерного опыта. Изучение скриптинга, языков программирования и архитектуры ПО. Переход в профессиональное системное администрирование: работа с инфраструктурой провайдеров и крупного ритейла.',
    'Эволюция в DevOps. Фокус на автоматизации рутины, развертывании CI/CD, контейнеризации и поддержке отказоустойчивых систем. Оптимизация процессов разработки и интеграции.',
    'Развитие собственной инфраструктуры. Использование локальных ИИ-моделей на собственных мощностях для аналитики, парсинга кода и автоматизации переводов. Постоянный фокус на надежность систем и открытый код.'
  ],
  techStackTitle: 'СТЕК ТЕХНОЛОГИЙ',
  techStack: [
    { category: 'INFRASTRUCTURE & OS', items: ['Proxmox', 'ESXi', 'Docker', 'Windows Server / AD', 'Linux (CentOS, Debian)', 'Zabbix'] },
    { category: 'NETWORKING', items: ['Juniper', 'HPE FlexFabric', 'Cisco / Aruba', 'MikroTik', 'VLAN / LACP / QoS', 'TCP/IP'] },
    { category: 'DEV & AUTOMATION', items: ['PowerShell', 'Bash', 'Python', 'C#', 'GitLab CI', 'PHP / SQL'] },
    { category: 'HARDWARE & SYSTEMS', items: ['IBM System / Flash', 'Lenovo SR Series', 'Zebra / Honeywell TSD', 'TGW Logistics', 'PERCo', 'APC / PDU'] }
  ],
  experienceTitle: 'СИСТЕМНЫЙ ЛОГ ОПЫТА',
  experience: [
    { period: '2022 — НАСТ. ВРЕМЯ', company: 'GLORIA JEANS', role: 'СИСТЕМНЫЙ АДМИНИСТРАТОР / DEVOPS', desc: 'Устранение сбоев роботизированных конвейеров (TGW), администрирование серверов (IBM, Lenovo), сетей (Juniper, HPE). Внедрение систем мониторинга (Zabbix), скриптинг (PowerShell/Bash/Python) для автоматизации.' },
    { period: '2019 — 2022', company: 'GLORIA JEANS', role: 'ИНЖЕНЕР ТЕХНИЧЕСКОЙ ПОДДЕРЖКИ', desc: 'Обслуживание ИТ-инфраструктуры логистического центра (ТСД, принтеры Zebra/Kyocera, сетевое оборудование). Поддержка систем видеонаблюдения и ERP (1С).' },
    { period: '2017 — 2018', company: 'РОСТЕЛЕКОМ', role: 'ИНЖЕНЕР СВЯЗИ', desc: 'Настройка и наладка сетевого оборудования корпоративных клиентов (Juniper, MikroTik). Организация оптоволоконной и витопарной связи.' }
  ],
  contactEyebrow: 'Контакты',
  contactTitle: 'СВЯЗАТЬСЯ СО МНОЙ',
  contactText: 'Открыт к обсуждению инфраструктурных задач, проектов по DevOps-автоматизации, реверс-инжинирингу и техническому сотрудничеству.',
  contactActions: [
    { label: 'Написать в Telegram', href: 'https://t.me/memasev1ch' },
    { label: 'Написать на почту', href: 'mailto:eganddn@gmail.com' },
    { label: 'Открыть GitHub', href: 'https://github.com/memasevich' },
    { label: 'Поддержать на Boosty', href: 'https://boosty.to/memasevich' }
  ],
  footer: 'Русский — основная версия',
};
