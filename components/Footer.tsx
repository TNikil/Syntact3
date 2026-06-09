import styles from './Footer.module.css';
import LogoSync3 from './icons/LogoSyn3';

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/syntact3' },
  { label: 'Facebook', href: 'https://www.facebook.com/syntact3' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/syntact3' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.logo}>
        <LogoSync3 className="w-auto h-4 md:h-5" />
      </span>
      <span className={styles.copy}>
        © 2025 Syntac Studio. All rights reserved.
      </span>
      <div className={styles.socials}>
        {socials.map((s, i) => (
          <span key={s.label}>
            <a
              href={s.href}
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.label}
            </a>
            {i < socials.length - 1 && <span className={styles.sep}> · </span>}
          </span>
        ))}
      </div>
    </footer>
  );
}
