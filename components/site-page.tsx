/* oxlint-disable next/no-img-element -- Local static project artwork is already sized and optimized for export. */
import Link from 'next/link';
import {
  Code2,
  ExternalLink,
  Languages,
  Network,
  Send,
  Zap,
} from 'lucide-react';

type Accent = 'lime' | 'coral' | 'violet';

type WorkItem = {
  title: string;
  type: string;
  role: string;
  task: string;
  done: string;
  status: string;
  href?: string;
  accent: Accent;
};

type Localization = {
  title: string;
  area: string;
  description: string;
  status: string;
  note: string;
  image: string;
  imageAlt: string;
  href?: string;
};

export type SiteContent = {
  locale: 'ru' | 'en';
  nav: { works: string; about: string; contact: string };
  identity: string;
  heroTitle: string;
  heroLead: string;
  primaryCta: string;
  secondaryCta: string;
  toolsTitle: string;
  toolsIntro: string;
  tools: WorkItem[];
  localizationTitle: string;
  localizationIntro: string;
  localizations: Localization[];
  aboutTitle: string;
  aboutText: string[];
  contactEyebrow: string;
  contactTitle: string;
  contactText: string;
  contactActions: { label: string; href: string }[];
  footer: string;
};

function StatusMark({ accent = 'lime' }: { accent?: Accent }) {
  return <span className={`status-mark status-${accent}`} aria-hidden="true" />;
}

function PacketTrace() {
  return <span className="packet-trace" aria-hidden="true">{Array.from({ length: 12 }, (_, index) => <i key={index} />)}</span>;
}

function GithubMark() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .7a11.3 11.3 0 0 0-3.6 22c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.9 1.4 3.6 1.1.1-.8.4-1.4.8-1.7-2.6-.3-5.4-1.3-5.4-5.6 0-1.2.4-2.2 1.2-3-.1-.3-.5-1.5.1-3 0 0 1-.3 3.1 1.2a10.6 10.6 0 0 1 5.6 0C17.7 5 18.8 5.3 18.8 5.3c.6 1.5.2 2.7.1 3 .8.8 1.2 1.8 1.2 3 0 4.3-2.8 5.3-5.4 5.6.4.4.8 1.1.8 2.2v3.1c0 .3.2.7.8.6A11.3 11.3 0 0 0 12 .7Z" /></svg>;
}

function UtpBackbone({ side }: { side: 'left' | 'right' }) {
  return <div className={`utp-backbone utp-${side}`} aria-hidden="true">
    <span className="utp-label">CAT6 / T568B</span>
    <span className="rj45-plug rj45-top">{Array.from({ length: 8 }, (_, index) => <b key={index} />)}</span>
    <span className="utp-jacket" />
    <i className="utp-pair pair-orange" />
    <i className="utp-pair pair-blue" />
    <i className="utp-pair pair-green" />
    <i className="utp-pair pair-brown" />
    <span className="utp-data-packet" />
    <span className="utp-port utp-port-a">ETH0</span>
    <span className="utp-port utp-port-b">LAN</span>
    <span className="utp-port utp-port-c">WAN</span>
    <span className="rj45-plug rj45-bottom">{Array.from({ length: 8 }, (_, index) => <b key={index} />)}</span>
  </div>;
}

function NetworkHarness() {
  const leftRun = 'M 52 0 C 50 420 205 520 112 970 S 42 1700 170 2130 S 52 2920 142 3490 S 48 4380 112 5200 S 72 5900 84 6200';
  const rightRun = 'M 1548 0 C 1550 540 1400 690 1492 1180 S 1558 1880 1430 2360 S 1550 3180 1460 3710 S 1554 4550 1488 5220 S 1520 5850 1510 6200';

  return <svg className="network-harness" viewBox="0 0 1600 6200" preserveAspectRatio="none" aria-hidden="true">
    <g className="network-cable network-cable-left">
      <path className="network-sheath" d={leftRun} />
      <path className="network-core network-core-orange" d={leftRun} />
      <path className="network-core network-core-blue" d={leftRun} />
      <path className="network-core network-core-green" d={leftRun} />
      <path className="network-core network-core-brown" d={leftRun} />
      <path className="network-packet" d={leftRun} pathLength="100" />
    </g>
    <g className="network-cable network-cable-right">
      <path className="network-sheath" d={rightRun} />
      <path className="network-core network-core-orange" d={rightRun} />
      <path className="network-core network-core-blue" d={rightRun} />
      <path className="network-core network-core-green" d={rightRun} />
      <path className="network-core network-core-brown" d={rightRun} />
      <path className="network-packet network-packet-delayed" d={rightRun} pathLength="100" />
    </g>
    <g className="network-drops">
      <path d="M 114 970 C 235 970 272 930 372 930" />
      <path d="M 1431 2360 C 1340 2360 1306 2410 1208 2410" />
      <path d="M 143 3490 C 248 3490 284 3440 388 3440" />
      <path d="M 1488 5220 C 1390 5220 1350 5160 1264 5160" />
      <rect x="366" y="916" width="22" height="28" />
      <rect x="1186" y="2396" width="22" height="28" />
      <rect x="382" y="3426" width="22" height="28" />
      <rect x="1242" y="5146" width="22" height="28" />
    </g>
  </svg>;
}

const matrixStreams = [
  '0101011010011100101101',
  'M 0 1 1 0 0 1 0 1 1 0',
  '1100100101110011010110',
  'SYS 01 10 DEV 11 OPS',
  '0011011100100110101011',
  '0 1 0 0 1 1 0 1 0 1 1',
  '1101010010111010011010',
  'NODE / LINK / BUILD',
  '0100110101100101110011',
  '1011011001001101010110',
  'RU 01 10 LOCAL 11',
  '0010110111010010011011',
  '1010100100111011010010',
  'M  E  M  A  S  E  V  I  C  H',
  '0110101100101011011010',
  '1001011010110010110101',
];

function SignalMatrix({ ru }: { ru: boolean }) {
  return <aside className="signal-matrix" aria-label={ru ? 'Абстрактная цифровая матрица' : 'Abstract digital matrix'}>
    <div className="matrix-topline"><span>VOID / 01</span><b>MEMASEVICH</b><small>ICE SIGNAL</small></div>
    <div className="matrix-field" aria-hidden="true">
      <div className="matrix-gridlines" />
      {matrixStreams.map((stream, index) => <i className={`matrix-stream matrix-stream-${index + 1}`} key={stream}>{stream}</i>)}
      <b className="matrix-mark">M</b>
      <span className="matrix-cross matrix-cross-a" />
      <span className="matrix-cross matrix-cross-b" />
    </div>
    <div className="matrix-meta"><span>STATIC PROFILE</span><b>{ru ? 'СИСТЕМА / ЛИЧНОЕ' : 'SYSTEM / PERSONAL'}</b><i aria-hidden="true" /></div>
  </aside>;
}

function WorkCard({ item, index, locale }: { item: WorkItem; index: number; locale: 'ru' | 'en' }) {
  const ru = locale === 'ru';

  return <article className={`work-card work-${item.accent}`}>
    <span className="rack-screw rack-screw-a" aria-hidden="true" />
    <span className="rack-screw rack-screw-b" aria-hidden="true" />
    <header className="work-card-head"><span>MODULE_0{index + 1}</span><span>{item.type}</span></header>
    <div className="work-card-title"><StatusMark accent={item.accent} /><h3>{item.title}</h3></div>
    <PacketTrace />
    <dl className="work-facts">
      <div><dt>{ru ? 'РОЛЬ' : 'ROLE'}</dt><dd>{item.role}</dd></div>
      <div><dt>{ru ? 'ЗАДАЧА' : 'TASK'}</dt><dd>{item.task}</dd></div>
      <div><dt>{ru ? 'СДЕЛАНО' : 'DONE'}</dt><dd>{item.done}</dd></div>
      <div><dt>{ru ? 'СТАТУС' : 'STATUS'}</dt><dd className="work-status">{item.status}</dd></div>
    </dl>
    {item.href
      ? <a className="work-link" href={item.href} target="_blank" rel="noopener noreferrer">{item.type.includes('INTERNAL') ? (ru ? 'Описание в GitHub-профиле' : 'Description in GitHub profile') : (ru ? 'Открыть узел' : 'Open node')} <ExternalLink size={14} aria-hidden="true" /></a>
      : <span className="work-todo">{ru ? 'Ссылка не опубликована' : 'Link is not public'}</span>}
  </article>;
}

function SectionHead({ index, command, title, intro, icon }: { index: string; command: string; title: string; intro: string; icon: React.ReactNode }) {
  return <div className="section-head">
    <div>
      <div className="eyebrow section-command"><span>{index}</span>{command}</div>
      <h2>{icon}{title}</h2>
    </div>
    <p>{intro}</p>
  </div>;
}

export default function SitePage({ content, locale }: { content: SiteContent; locale: 'ru' | 'en' }) {
  const ru = locale === 'ru';
  const [heroName, ...heroRole] = content.heroTitle.split('\n');
  const storyLabels = ru ? ['СТАРТ', 'ПЕРВЫЕ СЕРВЕРЫ', 'ПУТЬ', 'DEVOPS', 'СЕЙЧАС'] : ['START', 'FIRST SERVERS', 'THE PATH', 'DEVOPS', 'NOW'];
  const socialNodes = [
    { key: 'github', name: 'GITHUB', handle: '@memasevich', label: ru ? 'Код и публичные репозитории' : 'Code and public repositories', href: 'https://github.com/memasevich', icon: <GithubMark /> },
    { key: 'telegram', name: 'TELEGRAM', handle: '@memasev1ch', label: ru ? 'Связь и сообщения об ошибках' : 'Contact and bug reports', href: 'https://t.me/memasev1ch', icon: <Send aria-hidden="true" /> },
    { key: 'boosty', name: 'BOOSTY', handle: '/memasevich', label: ru ? 'Релизы, заметки и поддержка' : 'Releases, notes, and support', href: 'https://boosty.to/memasevich', icon: <Zap aria-hidden="true" /> },
  ];
  return <div className="site-shell" lang={locale}>
    <NetworkHarness />
    <UtpBackbone side="left" />
    <UtpBackbone side="right" />
    <header className="container topbar">
      <Link className="wordmark" href={ru ? '/' : '/en'} aria-label="MEMASEVICH"><span>root@</span>memasevich:<b>~$</b></Link>
      <span className="network-badge"><Network size={13} aria-hidden="true" />UTP / CAT6 / T568B</span>
      <nav aria-label={ru ? 'Основная навигация' : 'Main navigation'}>
        <a className="nav-link" href="#works"><span>01/</span>{content.nav.works}</a>
        <a className="nav-link" href="#about"><span>02/</span>{content.nav.about}</a>
        <a className="nav-link" href="#contact"><span>03/</span>{content.nav.contact}</a>
        <span className="locale-switch" aria-label={ru ? 'Язык сайта' : 'Site language'}><Link className={ru ? 'active' : ''} href="/">RU</Link><Link className={!ru ? 'active' : ''} href="/en">EN</Link></span>
      </nav>
    </header>

    <main>
      <section className="container hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow command-line">{content.identity}</div>
            <h1><span>{heroName}</span>{heroRole.join('\n')}</h1>
            <p className="hero-lede">{content.heroLead}</p>
            <div className="hero-actions">
              <a className="hero-primary" href="#works">{content.primaryCta}<span aria-hidden="true">↓</span></a>
              <a className="hero-secondary" href="https://t.me/memasev1ch" target="_blank" rel="noopener noreferrer">{content.secondaryCta}<ExternalLink size={14} aria-hidden="true" /></a>
            </div>
          </div>
          <SignalMatrix ru={ru} />
        </div>
      </section>

      <section className="container social-nodes" aria-label={ru ? 'Публичные каналы' : 'Public channels'}>
        {socialNodes.map((node, index) => <a className={`social-node node-${node.key}`} href={node.href} target="_blank" rel="noopener noreferrer" key={node.key}>
          <div className="social-icon">{node.icon}</div><span className="node-index">NODE_0{index + 1}</span><strong>{node.name}</strong><small>{node.handle}</small><p>{node.label}</p>
          <div className="node-footer"><PacketTrace /><ExternalLink size={14} aria-hidden="true" /></div>
        </a>)}
      </section>

      <section className="container works" id="works">
        <SectionHead index="01A" command="ls /work/applied" title={content.toolsTitle} intro={content.toolsIntro} icon={<Code2 aria-hidden="true" />} />
        <div className="work-grid">{content.tools.map((item, index) => <WorkCard item={item} index={index} locale={locale} key={item.title} />)}</div>

        <div className="subsection"><SectionHead index="01B" command="ls /work/localization" title={content.localizationTitle} intro={content.localizationIntro} icon={<Languages aria-hidden="true" />} /></div>
        <div className="localization-grid">{content.localizations.map((game, index) => <article className="localization-card" key={game.title}>
          <span className="localization-index">LOC_NODE_0{index + 1}</span>
          <figure className="localization-media">
            <img src={game.image} alt={game.imageAlt} width="640" height="480" loading="lazy" decoding="async" />
            <figcaption>PUBLIC PROJECT IMAGE // SOURCE</figcaption>
            <span aria-hidden="true" />
          </figure>
          <div className="localization-title"><Languages size={18} aria-hidden="true" /><span className="game-code">GAME / RU</span><h3>{game.title}</h3></div>
          <PacketTrace />
          <dl><div><dt>{ru ? 'ОБЛАСТЬ' : 'AREA'}</dt><dd>{game.area}</dd></div><div><dt>{ru ? 'СТАТУС' : 'STATUS'}</dt><dd>{game.status}</dd></div></dl>
          <p>{game.description}</p><small>{game.note}</small>
          {game.href ? <a className="localization-link" href={game.href} target="_blank" rel="noopener noreferrer">{ru ? 'Открыть репозиторий' : 'Open repository'} <ExternalLink size={13} aria-hidden="true" /></a> : null}
        </article>)}</div>

      </section>

      <section className="container about" id="about">
        <div className="about-label"><div className="eyebrow section-command"><span>02</span>{content.nav.about}</div><figure className="portrait-card"><img src="/portrait/memasevich-workspace.jpg" alt={ru ? 'Memasevich за рабочим местом' : 'Memasevich at the workspace'} width="640" height="640" loading="lazy" decoding="async" /><figcaption><span>MEMASEVICH</span><small>WORKSPACE / 2025</small></figcaption></figure></div>
        <div className="about-copy"><h2>{content.aboutTitle}</h2><div className="about-story">{content.aboutText.map((paragraph, index) => <p key={paragraph}><span className="story-index">0{index + 1} / {storyLabels[index]}</span><span>{paragraph}</span></p>)}</div><span className="about-sign">MEMASEVICH / INDEPENDENT / SYSTEMS</span></div>
        <dl className="about-spec"><div><dt>PUBLIC_ROLE</dt><dd>SYSADMIN / DEVOPS / SOFTWARE ENGINEER</dd></div><div><dt>WORK_MODE</dt><dd>INDEPENDENT</dd></div><div><dt>PRIMARY_LANG</dt><dd>RU</dd></div><div><dt>VALUES</dt><dd>RELIABILITY / CLARITY / SUPPORT</dd></div></dl>
      </section>

      <section className="contact" id="contact"><div className="container">
        <div className="contact-terminal"><div className="contact-prompt"><span>root@memasevich:~$</span> connect --human</div><div className="contact-cursor" aria-hidden="true" /></div>
        <div className="contact-top"><div><div className="eyebrow">03 — {content.contactEyebrow}</div><h2>{content.contactTitle}</h2><p>{content.contactText}</p></div><div className="contact-actions">{content.contactActions.map((action, index) => <a key={action.label} href={action.href} target={action.href.startsWith('http') ? '_blank' : undefined} rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}><span>0{index + 1} / {action.label}</span><ExternalLink size={15} aria-hidden="true" /></a>)}</div></div>
        <div className="contact-links">{socialNodes.map(node => <a href={node.href} target="_blank" rel="noopener noreferrer" key={node.key}>{node.icon}<span>{node.name}</span><small>{node.handle}</small></a>)}</div>
      </div></section>
    </main>

    <footer className="container footer"><span>© 2026 MEMASEVICH</span><span>{content.footer}</span><span className="footer-status"><StatusMark />END_OF_TRANSMISSION</span></footer>
  </div>;
}
