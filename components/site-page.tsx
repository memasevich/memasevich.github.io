/* oxlint-disable next/no-img-element -- Local static project artwork is already sized and optimized for export. */
import Link from 'next/link';
import {
  Code2,
  ExternalLink,
  Gamepad2,
  Languages,
  Mail,
  Send,
  Terminal,
  Zap,
} from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { MobileNav } from './mobile-nav';
import { ItBackground } from './it-background';
import { WorkGallerySlider, type GallerySlide } from './work-gallery-slider';
import { GithubActivity, GithubMark } from './github-activity';
import { TerminalDaemonHeist } from './terminal-daemon-heist';

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
  featured?: boolean;
  highlightMetric?: string;
  tags?: string[];
  gallery?: GallerySlide[];
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
  nav: { works: string; about: string; resume: string; games: string; contact: string };
  identity: string;
  heroTitle: string;
  heroLead: string;
  primaryCta: string;
  toolsTitle: string;
  toolsIntro: string;
  tools: WorkItem[];
  localizationTitle: string;
  localizationIntro: string;
  localizations: Localization[];
  aboutTitle: string;
  aboutText: string[];
  favoriteGamesTitle: string;
  favoriteGamesIntro: string;
  favoriteGames: { title: string; desc: string; img: string; playtime: string }[];
  techStackTitle: string;
  techStack: { category: string; items: string[] }[];
  experienceTitle: string;
  experience: { period: string; company: string; role: string; desc: string }[];
  contactEyebrow: string;
  contactTitle: string;
  contactText: string;
  contactActions: { label: string; href: string }[];
  footer: string;
};

function StatusMark({ accent = 'lime' }: { accent?: Accent }) {
  return <span className={`status-mark status-${accent}`} aria-hidden="true" />;
}

function WorkCard({ item, index, locale }: { item: WorkItem; index: number; locale: 'ru' | 'en' }) {
  const ru = locale === 'ru';

  return (
    <article className={`work-card work-${item.accent}${item.featured ? ' work-card-featured' : ''}`}>
      <header className="work-card-head">
        <div className="work-head-left">
          <span>MOD_0{index + 1}</span>
          <span className="work-badge">{item.type}</span>
        </div>
        {item.highlightMetric && (
          <div className="work-metric-pill">
            <Zap size={12} aria-hidden="true" />
            <span>{item.highlightMetric}</span>
          </div>
        )}
      </header>
      <div className="work-card-title">
        <StatusMark accent={item.accent} />
        <h3>{item.title}</h3>
      </div>
      <dl className="work-facts">
        <div>
          <dt>{ru ? 'РОЛЬ' : 'ROLE'}</dt>
          <dd>{item.role}</dd>
        </div>
        <div>
          <dt>{ru ? 'ЗАДАЧА' : 'TASK'}</dt>
          <dd>{item.task}</dd>
        </div>
        <div>
          <dt>{ru ? 'СДЕЛАНО' : 'DONE'}</dt>
          <dd>{item.done}</dd>
        </div>
        <div>
          <dt>{ru ? 'СТАТУС' : 'STATUS'}</dt>
          <dd className="work-status">{item.status}</dd>
        </div>
      </dl>
      {item.tags && item.tags.length > 0 && (
        <div className="work-tags" aria-label={ru ? 'Стек технологий' : 'Technology stack'}>
          {item.tags.map((tag) => (
            <span className="work-tag" key={tag}>{tag}</span>
          ))}
        </div>
      )}
      {item.gallery && item.gallery.length > 0 && (
        <WorkGallerySlider items={item.gallery} locale={locale} />
      )}
      {item.href ? (
        <a className="work-link" href={item.href} target="_blank" rel="noopener noreferrer">
          {item.type.includes('INTERNAL')
            ? ru
              ? 'Профиль GitHub'
              : 'GitHub Profile'
            : ru
            ? 'Репозиторий'
            : 'Repository'}
          <ExternalLink size={14} aria-hidden="true" />
        </a>
      ) : (
        <span className="work-todo">{ru ? 'Закрытый модуль / Приватный доступ' : 'Internal module / Private access'}</span>
      )}
    </article>
  );
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
  const contactChannels = [
    {
      key: 'telegram',
      name: 'TELEGRAM',
      handle: '@memasev1ch',
      desc: ru ? 'Оперативная связь, предложения и быстрые вопросы' : 'Direct messages, inquiries, and fast response',
      badge: ru ? 'ОСНОВНОЙ КАНАЛ' : 'PRIMARY CHANNEL',
      actionText: ru ? 'Написать в Telegram' : 'Message on Telegram',
      href: 'https://t.me/memasev1ch',
      icon: <Send size={18} aria-hidden="true" />,
    },
    {
      key: 'email',
      name: 'EMAIL',
      handle: 'eganddn@gmail.com',
      desc: ru ? 'Официальные запросы, проектная документация и ТЗ' : 'Formal inquiries, documentation, and specs',
      badge: ru ? 'ПРЯМОЙ АДРЕС' : 'DIRECT EMAIL',
      actionText: ru ? 'Написать на почту' : 'Send an Email',
      href: 'mailto:eganddn@gmail.com',
      icon: <Mail size={18} aria-hidden="true" />,
    },
    {
      key: 'github',
      name: 'GITHUB',
      handle: '@memasevich',
      desc: ru ? 'Открытые репозитории, баг-трекер и пул-реквесты' : 'Open-source code, issue tracker, pull requests',
      badge: ru ? 'РЕПОЗИТОРИИ' : 'REPOSITORIES',
      actionText: ru ? 'Открыть профиль' : 'Open GitHub Profile',
      href: 'https://github.com/memasevich',
      icon: <GithubMark />,
    },
    {
      key: 'boosty',
      name: 'BOOSTY',
      handle: '/memasevich',
      desc: ru ? 'Поддержка независимых игровых локализаций и утилит' : 'Support independent game localizations and tools',
      badge: ru ? 'ПОДДЕРЖКА' : 'SPONSOR',
      actionText: ru ? 'Поддержать автора' : 'Support on Boosty',
      href: 'https://boosty.to/memasevich',
      icon: <Zap size={18} aria-hidden="true" />,
    },
  ];
  return <div className="site-shell" lang={locale}>
    <ItBackground />
    <header className="container topbar">
      <Link className="wordmark" href={ru ? '/' : '/en'} aria-label="MEMASEVICH"><span>root@</span>memasevich:<b>~$</b></Link>
      <span className="topbar-status"><span className="status-dot" aria-hidden="true" />SYS_ONLINE • 99.98%</span>
      <nav aria-label={ru ? 'Основная навигация' : 'Main navigation'}>
        <a className="nav-link" href="#works"><span>01/</span>{content.nav.works}</a>
        <a className="nav-link" href="#about"><span>02/</span>{content.nav.about}</a>
        <a className="nav-link" href="#resume"><span>03/</span>{content.nav.resume}</a>
        <a className="nav-link" href="#games"><span>04/</span>{content.nav.games}</a>
        <a className="nav-link" href="#contact"><span>05/</span>{content.nav.contact}</a>
        <span className="locale-switch" aria-label={ru ? 'Язык сайта' : 'Site language'}><Link className={ru ? 'active' : ''} href="/">RU</Link><Link className={!ru ? 'active' : ''} href="/en">EN</Link></span>
        <ThemeToggle />
      </nav>
      <MobileNav
        locale={locale}
        langLabel={ru ? 'Мобильная навигация' : 'Mobile navigation'}
        items={[
          { href: '#works', index: '01/', label: content.nav.works },
          { href: '#about', index: '02/', label: content.nav.about },
          { href: '#resume', index: '03/', label: content.nav.resume },
          { href: '#games', index: '04/', label: content.nav.games },
          { href: '#contact', index: '05/', label: content.nav.contact },
        ]}
      />
    </header>

    <main>
      <section className="container bento-hero">
        <div className="bento-grid">
          {/* Bento Card 1: Profile & Identity */}
          <div className="bento-card bento-profile">
            <div className="bento-card-top">
              <span className="bento-badge">
                <StatusMark accent="lime" />
                {ru ? 'ДОСТУПЕН ДЛЯ ЗАДАЧ' : 'AVAILABLE FOR WORK'}
              </span>
              <span className="bento-cli-tag">root@memasevich:~$</span>
            </div>

            <div className="bento-title-group">
              <TerminalDaemonHeist heroName={heroName} locale={locale} />
              <p className="bento-roles">{heroRole.join(' • ')}</p>
            </div>

            <p className="bento-lead">{content.heroLead}</p>

            <div className="bento-actions">
              <a className="bento-primary-btn" href="#works">
                {content.primaryCta} <span aria-hidden="true">↓</span>
              </a>
              <div className="bento-social-row">
                <a className="bento-social-btn" href="https://t.me/memasev1ch" target="_blank" rel="noopener noreferrer" title="Telegram">
                  <Send size={15} aria-hidden="true" />
                  <span>Telegram</span>
                </a>
                <a className="bento-social-btn" href="https://github.com/memasevich" target="_blank" rel="noopener noreferrer" title="GitHub">
                  <GithubMark />
                  <span>GitHub</span>
                </a>
                <a className="bento-social-btn" href="https://boosty.to/memasevich" target="_blank" rel="noopener noreferrer" title="Boosty">
                  <Zap size={15} aria-hidden="true" />
                  <span>Boosty</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bento Card 2: System Telemetry */}
          <div className="bento-card bento-telemetry">
            <div className="bento-card-top">
              <span className="telemetry-label">
                <Terminal size={14} aria-hidden="true" />
                SYS_TELEMETRY
              </span>
              <span className="telemetry-live">● ONLINE</span>
            </div>

            <dl className="telemetry-grid">
              <div className="telemetry-item">
                <dt>PLATFORM</dt>
                <dd>Proxmox VE / Debian</dd>
              </div>
              <div className="telemetry-item">
                <dt>LOCATION</dt>
                <dd>Moscow, RU (UTC+3)</dd>
              </div>
              <div className="telemetry-item">
                <dt>CORE STACK</dt>
                <dd>Linux • Docker • C# • Go</dd>
              </div>
              <div className="telemetry-item">
                <dt>SLA / UPTIME</dt>
                <dd className="uptime-val">99.98% / HA</dd>
              </div>
            </dl>

            <div className="telemetry-footer">
              <span className="telemetry-kernel">KERNEL: Linux 6.8 / ZFS</span>
              <span className="telemetry-status">STATUS: OK</span>
            </div>
          </div>

          {/* Bento Card 3: GitHub Activity Heatmap Matrix & Mascot Easter Egg */}
          <GithubActivity locale={locale} />
        </div>
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
          <dl><div><dt>{ru ? 'ОБЛАСТЬ' : 'AREA'}</dt><dd>{game.area}</dd></div><div><dt>{ru ? 'СТАТУС' : 'STATUS'}</dt><dd>{game.status}</dd></div></dl>
          <p>{game.description}</p><small>{game.note}</small>
          {game.href ? <a className="localization-link" href={game.href} target="_blank" rel="noopener noreferrer">{ru ? 'Открыть репозиторий' : 'Open repository'} <ExternalLink size={13} aria-hidden="true" /></a> : null}
        </article>)}</div>

      </section>

      <section className="container about" id="about">
        <div className="about-label"><div className="eyebrow section-command"><span>02</span>{content.nav.about}</div><figure className="portrait-card"><img src="/portrait/memasevich-workspace.jpg" alt={ru ? 'Memasevich за рабочим местом' : 'Memasevich at the workspace'} width="640" height="640" loading="lazy" decoding="async" /><figcaption><span>MEMASEVICH</span><small>WORKSPACE / 2025</small></figcaption></figure></div>
        <div className="about-copy"><h2>{content.aboutTitle}</h2><div className="about-story">{content.aboutText.map((paragraph, index) => <p key={paragraph}><span className="story-index">0{index + 1} / {storyLabels[index]}</span><span>{paragraph}</span></p>)}</div><span className="about-sign">MEMASEVICH / INDEPENDENT / SYSTEMS</span></div>
        <dl className="about-spec"><div><dt>PUBLIC_ROLE</dt><dd>SYSADMIN / DEVOPS / SOFTWARE ENGINEER</dd></div><div><dt>WORK_MODE</dt><dd>INDEPENDENT</dd></div><div><dt>FAV_GAMES</dt><dd>RIMWORLD / SATISFACTORY / GNOMORIA / MELVOR IDLE</dd></div><div><dt>VALUES</dt><dd>RELIABILITY / CLARITY / SUPPORT</dd></div></dl>
      </section>

      <section className="container cv-section" id="resume" aria-label={ru ? 'Резюме и опыт' : 'Resume and experience'}>
        <div className="cv-grid">
          
          <div className="experience-log">
            <div className="cv-heading"><span className="eyebrow">RESUME / 03A</span><h2>{content.experienceTitle}</h2></div>
            <div className="exp-timeline">
              {content.experience.map((job, idx) => (
                <div className="exp-node" key={idx}>
                  <div className="exp-meta"><span>{job.period}</span><b>{job.company}</b></div>
                  <div className="exp-content">
                    <h3>{job.role}</h3>
                    <p>{job.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="tech-stack">
            <div className="cv-heading"><span className="eyebrow">RESUME / 03B</span><h2>{content.techStackTitle}</h2></div>
            <div className="stack-grid">
              {content.techStack.map((stack) => (
                <div className="stack-group" key={stack.category}>
                  <h4>{stack.category}</h4>
                  <ul>{stack.items.map(item => <li key={item}>{item}</li>)}</ul>
                </div>
              ))}
            </div>
          </aside>

        </div>
      </section>

      <section className="container games-section" id="games" aria-label={ru ? 'Инженерные игры' : 'Engineering Games'}>
        <SectionHead
          index="04"
          command="ls /games/engineering"
          title={content.favoriteGamesTitle}
          intro={content.favoriteGamesIntro}
          icon={<Gamepad2 aria-hidden="true" />}
        />
        <div className="games-grid">
          {content.favoriteGames.map((game, index) => (
            <article className="game-card" key={game.title}>
              <span className="game-index">GAME_0{index + 1}</span>
              <figure className="game-media">
                <img src={game.img} alt={game.title} loading="lazy" decoding="async" />
              </figure>
              <div className="game-info">
                <h3>{game.title} <span className="game-playtime">{game.playtime}</span></h3>
                <p>{game.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="container">
          <div className="contact-terminal">
            <div className="contact-prompt">
              <span>root@memasevich:~$</span> connect --channel
            </div>
            <div className="contact-status-meta">
              <span className="status-mark status-lime" />
              <span>SYS_ONLINE • FAST_RESPONSE</span>
            </div>
          </div>

          <div className="contact-top">
            <div className="contact-info">
              <div className="eyebrow section-command">
                <span>05</span> {content.contactEyebrow}
              </div>
              <h2 className="contact-title">{content.contactTitle}</h2>
              <p className="contact-desc">{content.contactText}</p>
            </div>

            <div className="contact-availability-box">
              <div className="avail-header">
                <span className="status-mark status-lime" />
                <span>{ru ? 'СТАТУС И ВРЕМЯ ОТВЕТА' : 'STATUS & RESPONSE TIME'}</span>
              </div>
              <p className="avail-desc">
                {ru
                  ? 'Открыт для обсуждения инфраструктурных задач, DevOps-автоматизации, реверс-инжиниринга и технического сотрудничества.'
                  : 'Open for infrastructure challenges, DevOps automation, reverse engineering, and technical collaboration.'}
              </p>
              <div className="avail-meta">
                <span className="avail-tag">{ru ? '● Ответ в течение суток' : '● Response within 24h'}</span>
                <span className="avail-tag">{ru ? 'UTC+3 / Москва' : 'UTC+3 Timezone'}</span>
              </div>
            </div>
          </div>

          <div className="contact-bento-grid">
            {contactChannels.map((channel) => (
              <a
                key={channel.key}
                href={channel.href}
                target={channel.href.startsWith('http') ? '_blank' : undefined}
                rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`contact-card contact-card-${channel.key}`}
              >
                <div className="contact-card-top">
                  <div className="contact-card-icon">{channel.icon}</div>
                  <span className="contact-card-badge">{channel.badge}</span>
                </div>
                <div className="contact-card-body">
                  <div className="contact-card-name-row">
                    <span className="contact-card-name">{channel.name}</span>
                    <span className="contact-card-handle">{channel.handle}</span>
                  </div>
                  <p className="contact-card-desc">{channel.desc}</p>
                </div>
                <div className="contact-card-footer">
                  <span>{channel.actionText}</span>
                  <ExternalLink size={14} aria-hidden="true" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>

    <footer className="container footer"><span>© 2026 MEMASEVICH</span><span>{content.footer}</span><span className="footer-status"><StatusMark />END_OF_TRANSMISSION</span></footer>
  </div>;
}
