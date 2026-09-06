import type { SiteContent } from '../../components/site-page';

export const en: SiteContent = {
  locale: 'en',
  nav: { works: 'Work', about: 'About', resume: 'Resume', games: 'Simulations', contact: 'Contact' },
  identity: 'root@memasevich:~$ whoami',
  heroTitle: 'MEMASEVICH\nSYSADMIN / DEVOPS\nSOFTWARE ENGINEER',
  heroLead: 'Designing and maintaining infrastructure, automating processes, and creating tools for reverse-engineering and complex game localizations.',
  primaryCta: 'View work',
  toolsTitle: 'Applied development',
  toolsIntro: 'Practical solutions, automation services, and multi-model AI systems. Confirmed problems, system architecture, and reproducible results.',
  tools: [
    {
      title: 'FOOTLIVESTATS / AI ANALYST',
      type: 'AI / SPORTS ANALYTICS / PRIVATE',
      role: 'System architecture, live parsers, multi-model AI ensemble',
      task: 'Automated live statistical aggregation and predictive modeling for match dynamics in real time.',
      done: 'Started originally as a Telegram bot (@botstavki) before evolving into an autonomous analytics service. Multi-model AI ensemble powered by Claude, ChatGPT, DeepSeek, Kimi 3, and GLM 5.3 with deterministic code-gate filtering. Delivers high-precision pre-match/live analysis with a consistent 86–89% weekly win rate.',
      status: 'private service / production',
      accent: 'lime',
      featured: true,
      highlightMetric: '86–89% WEEKLY WIN RATE',
      tags: ['Claude', 'ChatGPT', 'DeepSeek', 'Kimi 3', 'GLM 5.3', 'Telegram Bot API', 'Python', 'Live Analytics', 'Data Aggregation'],
      gallery: [
        {
          src: '/projects/footlivestats-signals.png',
          alt: 'FootLiveStats — live signal log and outcome verification',
          label: 'SCREEN_01 // SIGNAL LOG (604/7D)',
          desc: 'Verified live signal log over 7 days (604 confirmed outcomes). Deterministic code-gates filter noise to maintain a steady 86–89% weekly win rate.',
        },
        {
          src: '/projects/footlivestats-chart.png',
          alt: 'FootLiveStats — total line flow and odds dynamics',
          label: 'SCREEN_02 // LINE & PRICE FLOW',
          desc: 'Real-time sync tracking of total line movement (yellow curve) and over odds. Instant detection of line shifts and value betting conditions.',
        },
        {
          src: '/projects/footlivestats-ai.png',
          alt: 'FootLiveStats — Overseer module tactical analysis',
          label: 'SCREEN_03 // AI ANALYZER «OVERSEER»',
          desc: 'Deep tactical breakdown by Overseer module using Claude, ChatGPT, DeepSeek, Kimi 3, and GLM 5.3 ensemble comparing pre-match baselines with live tempo.',
        },
      ],
    },
    {
      title: 'HANDHELD TERMINAL GUARD (TSD GUARD)',
      type: 'ANDROID / KOTLIN / HARDWARE / INTERNAL',
      role: 'Android service architecture, Zebra / Honeywell hardware sensor integration',
      task: 'Prevent loss, theft, and accidental drop damage to industrial data collection terminals across a logistics distribution center.',
      done: 'Engineered a native background Android service in Kotlin. Continuously polls hardware proximity sensors, holster optical detectors, and gyroscopes. If a terminal is removed from its protective holster or left idle outside designated workstations, it immediately locks the UI, sounds a loud high-visibility strobe alarm, and transmits telemetry over Wi-Fi to the central supervisor board. Reduced device damage and loss by over 70%.',
      status: 'internal production / proprietary',
      href: 'https://github.com/memasevich/memasevich',
      accent: 'violet',
      tags: ['Android', 'Kotlin', 'Hardware Sensors', 'Zebra EMDK', 'Honeywell SDK', 'Background Daemon', 'Loss Prevention']
    },
    {
      title: 'WMS SCANNING MODULE (BARCODE ENGINE)',
      type: 'WMS / C# / .NET / ERP INTEGRATION',
      role: 'Core reverse engineering, custom engine development, 1C:Enterprise integration',
      task: 'Replace the legacy, sluggish, and closed-source GS Code third-party module in the enterprise Warehouse Management System (WMS).',
      done: 'Architected a custom high-performance barcode processing engine from scratch in C#/.NET. Features streaming decoding for Code128, DataMatrix (Honest Sign), GS1-128, and EAN-13 with instantaneous in-memory SKU verification. A direct asynchronous bus connection to 1C:Enterprise slashed terminal scan latency from 800ms down to 45ms, eliminating conveyor bottlenecks and vendor licensing costs.',
      status: 'internal production / proprietary',
      href: 'https://github.com/memasevich/memasevich',
      accent: 'coral',
      tags: ['C#', '.NET', 'WMS Core', 'Barcode Engine', 'DataMatrix GS1', '1C:Enterprise', 'Low Latency', 'Reverse Engineering']
    }
  ],
  localizationTitle: 'Game localizations',
  localizationIntro: 'Three major projects from GitHub & Steam Workshop — with authentic assets, engine architecture details, and official links.',
  localizations: [
    {
      title: 'Caves of Qud',
      area: 'C# / Harmony Hooks / Procedural Morphology Engine',
      description: 'Comprehensive Russian localization for the legendary sci-fi roguelike (166,000+ lines). Features a custom runtime morphology engine providing dynamic grammatical case and gender agreement for procedurally generated items, creatures, lore books, and dialogues.',
      status: 'v1.0.6 / active game 2.0.211.x',
      href: 'https://github.com/memasevich/CoQ-ru-translate-public',
      note: 'SOURCE: GITHUB / RussianLocalization/preview.png',
      image: '/projects/coq-localization.png',
      imageAlt: 'Caves of Qud Russian localization image from the project repository',
      tags: ['C#', 'Harmony Hooks', 'Procedural Grammar', 'Morphology Engine', '166k+ Strings', 'Steam Workshop', 'DumpMissingStrings'],
      highlights: [
        '166,000+ lines of text & regex patterns: Complete translation of dialogue, lore books, hundreds of mutations, and artifacts.',
        'Morphology engine (forms_dictionary & stem_dictionary): Dynamic noun/adjective declensions without breaking procedural generation.',
        'Engine markup protection: Preserves in-game color tags, bracket syntax, and interface hotkey bindings.',
        'Built-in missing string collector: Automatically logs untranslated text to Documents/CavesOfQud_RU_Logs for rapid hotfixing.',
        'Dual delivery: Full support for Steam Workshop (id 3728849656) and standalone folder injection for GOG / DRM-free editions.'
      ],
      links: [
        { label: 'Steam Workshop', href: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3728849656', badge: 'WORKSHOP' },
        { label: 'GitHub Repository', href: 'https://github.com/memasevich/CoQ-ru-translate-public', badge: 'OPEN SOURCE' },
        { label: 'Boosty Changelog', href: 'https://boosty.to/memasevich', badge: 'CHANGELOG' }
      ]
    },
    {
      title: 'R.E.P.O.',
      area: 'StreamingAssets / 3-Tier TSV Schema / Cyrillic Styling',
      description: 'Complete quality Russian localization of the co-op horror shooter R.E.P.O. (Semiwork). Clean integration into the native StreamingAssets localization subsystem via three modular TSV tables without modifying game binaries or triggering anti-cheat flags.',
      status: 'repository / 100% content',
      href: 'https://github.com/memasevich/repo-russianlocalization',
      note: 'SOURCE: STEAM GUIDE / PUBLIC COVER',
      image: '/projects/repo-localization.jpg',
      imageAlt: 'Cover of the public R.E.P.O. Russian localization guide',
      tags: ['StreamingAssets', 'TSV Architecture', '100% Content', 'Game/HUD/Menu', 'Font Glyph Styling'],
      highlights: [
        '3-tier modular architecture: Structured separation across Game.tsv (items & monsters), HUD.tsv (suit interface), and Menu.tsv (settings).',
        '100% game coverage: Complete adaptation of terminal logs, lore entries, tutorial system, and network pings.',
        'Authentic typography: Custom Cyrillic glyphs matching the dark retro-futuristic sci-fi aesthetic.',
        'Non-destructive install: Simple drop-in to StreamingAssets/Localizations with zero risk of integrity corruption.'
      ],
      links: [
        { label: 'GitHub Repository', href: 'https://github.com/memasevich/repo-russianlocalization', badge: 'OPEN SOURCE' }
      ]
    },
    {
      title: 'Gnomoria',
      area: 'C# / XNA Dynamic Hook / Mono.Cecil / 0Harmony',
      description: 'Revolutionary next-gen localization powered by Dynamic Engine v0.6.0. Directly intercepts the XNA graphics pipeline at runtime to render antialiased Cyrillic glyphs on the fly without editing legacy XNB archives or font textures.',
      status: 'repository / Dynamic Engine v0.6.0',
      href: 'https://github.com/memasevich/Gnomoria-Russian-Translation',
      note: 'SOURCE: GITHUB / images/in_game_menu.png',
      image: '/projects/gnomoria-localization.png',
      imageAlt: 'Russian Gnomoria menu screenshot from the project repository',
      tags: ['C#', 'XNA Intercept', 'Mono.Cecil', '0Harmony', 'Patcher.exe', '12,253 Entries', 'Dynamic Parsing'],
      highlights: [
        'Dynamic XNA interception: Bypasses XNB font texture editing by hooking the graphics pipeline at bytecode level.',
        'Bytecode injector Patcher.exe: Mono.Cecil utility performing 1-second hook injection into Gnomoria.exe with automatic backup.',
        'Contextual grammar parsing: Algorithmic translation of composite item names ("copper felling axe" -> "лесорубный топор (медь)").',
        '12,253 dictionary entries: Full translation of UI menus, gnome job attributes, combat logs, and fluid dynamics.'
      ],
      links: [
        { label: 'GitHub Repository', href: 'https://github.com/memasevich/Gnomoria-Russian-Translation', badge: 'OPEN SOURCE' },
        { label: 'Releases & Builds', href: 'https://github.com/memasevich/Gnomoria-Russian-Translation/releases', badge: 'RELEASES' }
      ]
    }
  ],
  favoriteGamesTitle: 'SYSTEMS THINKING & SIMULATIONS',
  favoriteGamesIntro: 'Complex simulators and engineering sandboxes as a training ground for balancing data flows, queue logistics, and architecture planning. 7,500+ hours of experience.',
  favoriteGames: [
    { title: 'RimWorld', desc: 'Colony management, logistics and survival', img: '/games/rimworld.jpg', playtime: '3000 hrs' },
    { title: 'Satisfactory', desc: 'Massive automation and factories', img: '/games/satisfactory.jpg', playtime: '2500 hrs' },
    { title: 'Gnomoria', desc: 'Deep management and microcontrol', img: '/games/gnomoria.jpg', playtime: '1000 hrs' },
    { title: 'Melvor Idle', desc: 'Process optimization and idle economy', img: '/games/melvor-idle.jpg', playtime: '1000 hrs' },
  ],
  aboutTitle: 'SYSTEM OPERATOR',
  aboutText: [
    'Technical background from an early age. Exploring hardware, assembling and diagnosing PCs, deeply diving into OS principles. Transitioning from a user to a systems architecture researcher.',
    'Deploying early servers and web projects. Practical experiments with hosting, networking, and databases. Parallel development in reverse-engineering and modifying client files.',
    'Systematizing engineering experience. Studying scripting, programming languages, and software architecture. Transitioning into professional system administration: managing infrastructure for ISPs and large-scale retail.',
    'Evolution into DevOps. Focusing on routine automation, CI/CD deployment, containerization, and maintaining fault-tolerant systems. Optimizing development and integration workflows.',
    'Expanding personal infrastructure. Utilizing local AI models on proprietary hardware for analytics, code parsing, and complex translation automation. Continuous focus on system reliability and open-source tooling.'
  ],
  techStackTitle: 'TECH STACK',
  techStack: [
    { category: 'INFRASTRUCTURE & OS', items: ['Proxmox', 'ESXi', 'Docker', 'Windows Server / AD', 'Linux (CentOS, Debian)', 'Zabbix'] },
    { category: 'NETWORKING', items: ['Juniper', 'HPE FlexFabric', 'Cisco / Aruba', 'MikroTik', 'VLAN / LACP / QoS', 'TCP/IP'] },
    { category: 'DEV & AUTOMATION', items: ['PowerShell', 'Bash', 'Python', 'C#', 'GitLab CI', 'PHP / SQL'] },
    { category: 'HARDWARE & SYSTEMS', items: ['IBM System / Flash', 'Lenovo SR Series', 'Zebra / Honeywell TSD', 'TGW Logistics', 'PERCo', 'APC / PDU'] }
  ],
  experienceTitle: 'SERVICE LOG / EXPERIENCE',
  experience: [
    { period: '2022 — PRESENT', company: 'GLORIA JEANS', role: 'SYSTEM ADMINISTRATOR / DEVOPS', desc: 'Troubleshooted automated conveyors (TGW), administered servers (IBM, Lenovo) and networks (Juniper, HPE). Implemented monitoring systems (Zabbix) and created scripts (PowerShell/Bash/Python) for automation.' },
    { period: '2019 — 2022', company: 'GLORIA JEANS', role: 'TECHNICAL SUPPORT ENGINEER', desc: 'IT infrastructure maintenance for the logistics center (scanners, Zebra/Kyocera printers, network equipment). Supported CCTV systems and ERP (1C).' },
    { period: '2017 — 2018', company: 'ROSTELECOM', role: 'NETWORK ENGINEER', desc: 'Configured and maintained network equipment for corporate clients (Juniper, MikroTik). Deployed fiber optic and twisted-pair connections.' }
  ],
  contactEyebrow: 'Contact',
  contactTitle: 'GET IN TOUCH',
  contactText: 'Open to discussing infrastructure tasks, DevOps automation, reverse-engineering projects, and technical collaboration.',
  contactActions: [
    { label: 'Write on Telegram', href: 'https://t.me/memasev1ch' },
    { label: 'Write by email', href: 'mailto:eganddn@gmail.com' },
    { label: 'Open GitHub', href: 'https://github.com/memasevich' },
    { label: 'Support on Boosty', href: 'https://boosty.to/memasevich' }
  ],
  footer: 'Russian is the primary version',
};
