import type { SiteContent } from '../../components/site-page';

export const en: SiteContent = {
  locale: 'en', nav: { projects: 'Projects', approach: 'Approach', contact: 'Contact' }, eyebrow: 'Systems / development / localization', title: 'MEMASEVICH', lede: 'I build things I would want to use myself. From the first diagram to a working result.', note: 'A small independent studio. Clear interfaces, living systems, and solutions without unnecessary noise.', projectsTitle: 'Projects',
  projects: [
    { title: 'Meccha Chameleon', description: 'An interface and visual system for a project where complexity is not hidden behind decorative layers.', tags: ['product', 'interface'], art: 'grid' },
    { title: 'OpenClaw Workspace', description: 'A workspace for tools and experiments, built to keep the context in view.', tags: ['system', 'development'], art: 'orb' },
    { title: 'Localization without compromise', description: 'Russian is not a fallback or a machine-translated layer. It is the primary version everything starts from.', tags: ['content', 'RU-first'], art: 'signal' },
  ],
  approachTitle: 'Meaning first. Form second.', principles: [
    { title: 'Real problems', text: 'I start with what needs to work and for whom. A beautiful screen is a result, not the goal.' },
    { title: 'Less excess', text: 'I do not add a dependency, service, or effect when leaving it out makes the system clearer, faster, and safer.' },
    { title: 'Built to continue', text: 'A project should be not just finished but repairable: clear structure, a recovery plan, and honest documentation.' },
  ], contactEyebrow: 'Contact', contactTitle: 'Have a problem?\nLet’s talk.', contactCta: 'Write me', footer: 'Russian is the primary version',
};
