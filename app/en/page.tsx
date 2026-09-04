import type { Metadata } from 'next';
import SitePage from '../../components/site-page';
import { HtmlLang } from '../../components/html-lang';
import { en } from '../../src/i18n/en';

export const metadata: Metadata = { title: 'Systems, development and game localizations', description: 'Memasevich — systems administration, DevOps, independent development, and Russian game localizations.', alternates: { canonical: '/en', languages: { 'ru-RU': '/', en: '/en', 'x-default': '/' } }, openGraph: { locale: 'en_US', url: 'https://memasevich.github.io/en' } };
export const dynamic = 'force-static';

export default function EnglishHome() { return <>
  <HtmlLang lang="en" />
  <SitePage content={en} locale="en" />
</>; }
