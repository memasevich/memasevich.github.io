import type { SiteContent } from '../../components/site-page';

export const en: SiteContent = {
  locale: 'en',
  nav: { works: 'Work', about: 'About', resume: 'Resume', games: 'Games', contact: 'Contact' },
  identity: 'root@memasevich:~$ whoami',
  heroTitle: 'MEMASEVICH\nSYSADMIN / DEVOPS\nSOFTWARE ENGINEER',
  heroLead: 'Designing and maintaining infrastructure, automating processes, and creating tools for reverse-engineering and complex game localizations.',
  primaryCta: 'View work',
  toolsTitle: 'Applied development',
  toolsIntro: 'Real internal solutions described in the public GitHub profile. The code is private, so only confirmed problems and outcomes are shown here.',
  tools: [
    { title: 'HANDHELD TERMINAL GUARD', type: 'ANDROID / INTERNAL', role: 'application development', task: 'Detect whether a warehouse handheld terminal remains in its protective case.', done: 'The app triggers an alarm when the device is removed from the case or left unattended.', status: 'internal project / private code', href: 'https://github.com/memasevich/memasevich', accent: 'violet' },
    { title: 'WMS SCANNING MODULE', type: 'WMS / INTERNAL', role: 'module replacement and development', task: 'Replace the outdated third-party GS Code solution.', done: 'The WMS scanning module was rewritten as an in-house solution.', status: 'internal project / private code', href: 'https://github.com/memasevich/memasevich', accent: 'coral' }
  ],
  localizationTitle: 'Game localizations',
  localizationIntro: 'Three public GitHub projects with real images, versions, and technical details taken from their README files.',
  localizations: [
    { title: 'Caves of Qud', area: 'C# / morphology / logs', description: 'Localization for version 2.0.211.x with more than 165,000 lines, dictionaries and patterns, morphology support, translated UI, and untranslated-text collection.', status: 'repository / v1.0.5', href: 'https://github.com/memasevich/CoQ-ru-translate-public', note: 'SOURCE: GITHUB / RussianLocalization/preview.png', image: '/projects/coq-localization.png', imageAlt: 'Caves of Qud Russian localization image from the project repository' },
    { title: 'R.E.P.O.', area: 'TSV / interface / content', description: 'Russian localization using the game’s built-in localization system and three TSV files: Game, HUD, and Menu. It covers items, enemies, tutorial, and interface.', status: 'repository / ~100%', href: 'https://github.com/memasevich/repo-russianlocalization', note: 'SOURCE: STEAM GUIDE / PUBLIC COVER', image: '/projects/repo-localization.jpg', imageAlt: 'Cover of the public R.E.P.O. Russian localization guide' },
    { title: 'Gnomoria', area: 'C# / XNA / render interception', description: 'Dynamic Engine v0.6.0 intercepts XNA rendering and displays Cyrillic without editing font textures or XNB files. The release dictionary contains 12,253 entries.', status: 'repository / v0.6.0', href: 'https://github.com/memasevich/Gnomoria-Russian-Translation', note: 'SOURCE: GITHUB / images/in_game_menu.png', image: '/projects/gnomoria-localization.png', imageAlt: 'Russian Gnomoria menu screenshot from the project repository' }
  ],
  favoriteGamesTitle: 'ENGINEERING GAMES',
  favoriteGamesIntro: 'I have been a fan of engineering games since childhood. Although I don\'t have much time for them, these projects perfectly reflect my systemic approach and love for automation.',
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
  contactTitle: 'STAY IN\nTOUCH.',
  contactText: 'Open to discussing infrastructure tasks, reverse-engineering projects, complex localizations, and technical collaboration.',
  contactActions: [
    { label: 'Write on Telegram', href: 'https://t.me/memasev1ch' },
    { label: 'Write by email', href: 'mailto:eganddn@gmail.com' },
    { label: 'Open GitHub', href: 'https://github.com/memasevich' },
    { label: 'Support on Boosty', href: 'https://boosty.to/memasevich' }
  ],
  footer: 'Russian is the primary version',
};
