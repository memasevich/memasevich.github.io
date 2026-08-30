import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://memasevich.ru'),
  title: {
    default: 'MEMASEVICH — системы, разработка и игровые локализации',
    template: '%s — MEMASEVICH',
  },
  description: 'Memasevich — системный администратор, DevOps-специалист и независимый разработчик. Инфраструктура, инструменты и русские игровые локализации.',
  alternates: { canonical: '/', languages: { 'ru-RU': '/', en: '/en', 'x-default': '/' } },
  openGraph: { title: 'MEMASEVICH — системы, разработка и игровые локализации', description: 'Инфраструктура, инструменты и русские игровые локализации.', url: 'https://memasevich.ru/', siteName: 'MEMASEVICH', locale: 'ru_RU', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'MEMASEVICH — системы, разработка и игровые локализации', description: 'Инфраструктура, инструменты и русские игровые локализации.' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
