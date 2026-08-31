import Link from 'next/link';

export const metadata = { title: '404 — узел не найден' };

const HINTS = [
  { cmd: 'ls ./works', label: '01 / Работы', href: '/#works' },
  { cmd: 'cat about.txt', label: '02 / Обо мне', href: '/#about' },
  { cmd: 'open resume.log', label: '03 / Резюме', href: '/#resume' },
  { cmd: 'connect --human', label: '04 / Контакт', href: '/#contact' },
];

export default function NotFound() {
  return (
    <div className="notfound-shell">
      <div className="notfound-term">
        <div className="notfound-head">
          <span>root@memasevich:~$</span>
          <small>node-404 / eth0</small>
        </div>
        <div className="notfound-body">
          <p>
            <span className="notfound-cmd">cd /this/path</span>
          </p>
          <p className="notfound-error">bash: cd: /404: No such file or directory</p>
          <p className="notfound-note">Запрошенный узел не отвечает. Проверьте ссылку или вернитесь на маршрутизатор:</p>
          <div className="notfound-links">
            {HINTS.map((hint) => (
              <a key={hint.href} href={hint.href}>
                <span>{hint.cmd}</span>
                {hint.label}
                <i>↵</i>
              </a>
            ))}
          </div>
          <p className="notfound-home">
            <Link href="/">← root@memasevich:~$</Link>
          </p>
        </div>
      </div>
    </div>
  );
}