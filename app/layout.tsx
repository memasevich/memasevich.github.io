import type { Metadata } from 'next';
import './globals.css';
import { HtmlLang } from '../components/html-lang';

export const metadata: Metadata = {
  metadataBase: new URL('https://memasevich.github.io'),
  title: {
    default: 'MEMASEVICH — системы, разработка и игровые локализации',
    template: '%s — MEMASEVICH',
  },
  description: 'Memasevich — системный администратор, DevOps-специалист и независимый разработчик. Инфраструктура, инструменты и русские игровые локализации.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/mascot/mascot-m.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/mascot/mascot-m.png',
  },
  alternates: { canonical: '/', languages: { 'ru-RU': '/', en: '/en', 'x-default': '/' } },
  openGraph: {
    title: 'MEMASEVICH — системы, разработка и игровые локализации',
    description: 'Инфраструктура, инструменты и русские игровые локализации.',
    url: 'https://memasevich.github.io/',
    siteName: 'MEMASEVICH',
    images: [{ url: '/memasevich.png', width: 1672, height: 941, alt: 'MEMASEVICH' }],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MEMASEVICH — системы, разработка и игровые локализации',
    description: 'Инфраструктура, инструменты и русские игровые локализации.',
    images: ['/memasevich.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body><HtmlLang lang="ru" />{children}</body></html>;
}
