import type { Metadata } from 'next';
import SitePage from '../../components/site-page';
import { en } from '../../src/i18n/en';

export const metadata: Metadata = { title: 'Systems, development, localization', description: 'Memasevich projects, interfaces, and localization work.', alternates: { canonical: '/en/', languages: { 'ru-RU': '/', en: '/en/', 'x-default': '/' } }, openGraph: { locale: 'en_US', url: 'https://memasevich.ru/en/' } };
export const dynamic = 'force-static';

export default function EnglishHome() { return <SitePage content={en} locale="en" />; }
