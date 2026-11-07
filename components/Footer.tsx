// Footer.tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import styles from './Footer.module.css';
import LogoSync3 from './icons/LogoSyn3';

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/syntact3' },
  { label: 'Facebook', href: 'https://www.facebook.com/syntact3' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/syntact3' },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Footer() {
  const prefersReduced = useReducedMotion();

  return (
    <motion.footer
      className={styles.footer}
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease }}
    >
      <span className={styles.logo}>
        <LogoSync3 className="w-auto h-4 md:h-5" />
      </span>

      <span className={styles.copy}>
        &copy; 2026 Syntact&sup3;. All rights reserved.
      </span>

      <div className={styles.socials}>
        {socials.map((s, i) => (
          <span key={s.label} className={styles.socialItem}>
            <a
              href={s.href}
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.label}
            </a>
            {i < socials.length - 1 && <span className={styles.sep}>·</span>}
          </span>
        ))}
      </div>
    </motion.footer>
  );
}
