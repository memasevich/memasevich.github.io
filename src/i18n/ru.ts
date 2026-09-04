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
    { title: 'ЗАЩИТНИК ДЛЯ ТСД', type: 'ANDROID / INTERNAL', role: 'разработка приложения', task: 'Контролировать, находится ли складской ТСД в защитном чехле.', done: 'Приложение поднимает тревогу, если устройство вынули из чехла или оставили без присмотра.', status: 'внутренний проект / код закрыт', href: 'https://github.com/memasevich/memasevich', accent: 'violet' },
    { title: 'МОДУЛЬ СКАНИРОВАНИЯ WMS', type: 'WMS / INTERNAL', role: 'разработка и замена модуля', task: 'Заменить устаревшее стороннее решение GS Code.', done: 'Модуль сканирования WMS переписан на собственное решение.', status: 'внутренний проект / код закрыт', href: 'https://github.com/memasevich/memasevich', accent: 'coral' }
  ],
  localizationTitle: 'Игровые локализации',
  localizationIntro: 'Три публичных проекта из GitHub — с реальными изображениями, версиями и техническими деталями из README.',
  localizations: [
    { title: 'Caves of Qud', area: 'C# / морфология / логи', description: 'Локализация для версии 2.0.211.x: более 165 000 строк, словари и паттерны, морфология, перевод интерфейса и сбор непереведённого текста.', status: 'репозиторий / v1.0.5', href: 'https://github.com/memasevich/CoQ-ru-translate-public', note: 'SOURCE: GITHUB / RussianLocalization/preview.png', image: '/projects/coq-localization.png', imageAlt: 'Русская локализация Caves of Qud — изображение из репозитория проекта' },
    { title: 'R.E.P.O.', area: 'TSV / интерфейс / контент', description: 'Русификатор через встроенную систему локализации игры и три TSV-файла: Game, HUD и Menu. Переведены предметы, противники, обучение и интерфейс.', status: 'репозиторий / ~100%', href: 'https://github.com/memasevich/repo-russianlocalization', note: 'SOURCE: STEAM GUIDE / PUBLIC COVER', image: '/projects/repo-localization.jpg', imageAlt: 'Обложка публичного руководства по русской локализации R.E.P.O.' },
    { title: 'Gnomoria', area: 'C# / XNA / перехват рендера', description: 'Dynamic Engine v0.6.0 перехватывает рендеринг XNA и выводит кириллицу без правки font texture/XNB. В словаре релиза — 12 253 записи.', status: 'репозиторий / v0.6.0', href: 'https://github.com/memasevich/Gnomoria-Russian-Translation', note: 'SOURCE: GITHUB / images/in_game_menu.png', image: '/projects/gnomoria-localization.png', imageAlt: 'Русское меню Gnomoria — скриншот из репозитория проекта' }
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
