import { ru } from '../src/i18n/ru';
import SitePage from '../components/site-page';

export default function Home() {
  return <SitePage content={ru} locale="ru" />;
}
