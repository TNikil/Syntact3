// Nav.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import styles from './Nav.module.css';
import LogoSync3 from './icons/LogoSyn3';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const ease = [0.16, 1, 0.3, 1] as const;

const navContainer: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease,
      delayChildren: 0.1,
      staggerChildren: 0.06,
    },
  },
};

const navItem: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

const overlayVariants: Variants = {
  closed: { opacity: 0, transition: { duration: 0.25 } },
  open: { opacity: 1, transition: { duration: 0.3 } },
};

const panelVariants: Variants = {
  closed: {
    x: '100%',
    transition: { duration: 0.35, ease },
  },
  open: {
    x: '0%',
    transition: { duration: 0.45, ease },
  },
};

const drawerLinkVariants: Variants = {
  closed: { opacity: 0, x: 20 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease, delay: 0.15 + i * 0.06 },
  }),
};

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  const lastScrollY = useRef(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,ar',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element',
      );
    };

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll while drawer open
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  // Escape key closes drawer
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleTranslate = (langCode: string) => {
    if (window.location.hostname === 'localhost') {
      document.cookie = `googtrans=/en/${langCode}; path=/;`;
    } else {
      document.cookie = `googtrans=/en/${langCode}; path=/; domain=.syntact3.com;`;
      document.cookie = `googtrans=/en/${langCode}; path=/;`;
    }

    const selectEl = document.querySelector(
      '.goog-te-combo',
    ) as HTMLSelectElement;
    if (selectEl) {
      selectEl.value = langCode;
      selectEl.dispatchEvent(new Event('change'));
      setCurrentLang(langCode);
    } else {
      window.location.reload();
    }

    if (window.location.hostname === 'localhost') {
      window.location.reload();
    }
  };

  return (
    <>
      <div id="google_translate_element" style={{ display: 'none' }} />

      <motion.nav
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${
          hidden ? styles.hidden : ''
        }`}
        variants={navContainer}
        initial={prefersReduced ? 'visible' : 'hidden'}
        animate="visible"
      >
        <motion.a href="#" className={styles.logo} variants={navItem}>
          <LogoSync3 className="w-auto h-4 md:h-5" />
        </motion.a>

        <div className={styles.navRight}>
          <ul className={styles.links}>
            {links.map((l) => (
              <motion.li key={l.href} variants={navItem}>
                <a href={l.href} className={styles.link}>
                  {l.label}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.button
          className={styles.burger}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          variants={navItem}
        >
          <span
            className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`}
          />
          <span
            className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`}
          />
          <span
            className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ''}`}
          />
        </motion.button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="overlay"
            className={styles.overlay}
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            key="panel"
            className={styles.drawer}
            variants={panelVariants}
            initial="closed"
            animate="open"
            exit="closed"
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
          >
            <div className={styles.drawerHeader}>
              <a href="#" className={styles.logoDrawer} onClick={closeMenu}>
                <LogoSync3 className="w-auto h-4" />
              </a>
              <button
                className={styles.drawerClose}
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <span />
                <span />
              </button>
            </div>

            <ul className={styles.drawerLinks}>
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  variants={drawerLinkVariants}
                  custom={i}
                  initial="closed"
                  animate="open"
                >
                  <a
                    href={l.href}
                    className={styles.drawerLink}
                    onClick={closeMenu}
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className={styles.drawerFooter}>
              <span className={styles.drawerLabel}>Language</span>
              <div className={styles.langToggle}>
                <button
                  className={`${styles.langBtn} ${
                    currentLang === 'en' ? styles.langBtnActive : ''
                  }`}
                  onClick={() => handleTranslate('en')}
                >
                  EN
                </button>
                <button
                  className={`${styles.langBtn} ${
                    currentLang === 'ar' ? styles.langBtnActive : ''
                  }`}
                  onClick={() => handleTranslate('ar')}
                >
                  AR
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
