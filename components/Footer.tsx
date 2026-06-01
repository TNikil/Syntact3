import styles from './Footer.module.css';

const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'Behance', href: '#' },
  { label: 'LinkedIn', href: '#' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.logo}>Syntac</span>
      <span className={styles.copy}>© 2025 Syntac Studio. All rights reserved.</span>
      <div className={styles.socials}>
        {socials.map((s, i) => (
          <span key={s.label}>
            <a href={s.href} className={styles.link}>{s.label}</a>
            {i < socials.length - 1 && <span className={styles.sep}> · </span>}
          </span>
        ))}
      </div>
    </footer>
  );
}
