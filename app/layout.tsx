import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://memasevich.ru'),
  title: {
    default: 'MEMASEVICH — системы, разработка, локализация',
    template: '%s — MEMASEVICH',
  },
  description: 'Официальный сайт Memasevich: реальные проекты, разработка интерфейсов и локализация.',
  alternates: { canonical: '/', languages: { 'ru-RU': '/', en: '/en/', 'x-default': '/' } },
  openGraph: { title: 'MEMASEVICH — системы, разработка, локализация', description: 'Вещи, которыми хочется пользоваться самому.', url: 'https://memasevich.ru/', siteName: 'MEMASEVICH', locale: 'ru_RU', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'MEMASEVICH — системы, разработка, локализация', description: 'Вещи, которыми хочется пользоваться самому.' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru-RU"><body>{children}</body></html>;
}
