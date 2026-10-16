// Nav.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './Nav.module.css';
import LogoSync3 from './icons/LogoSyn3';

// Setup TypeScript bindings for the script window objects
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

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Toggle scrolled state for glass blur intensity
      setScrolled(currentScrollY > 40);

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Core listener hook for Google engine setup
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

  const closeMenu = () => setMenuOpen(false);

  // Fires the manual drop-down dispatch event for translation
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
      {/* Target selector placeholder hook required by Google API */}
      <div id="google_translate_element" style={{ display: 'none' }} />

      <nav
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${
          hidden ? styles.hidden : ''
        }`}
      >
        {/* Logo wrapper using your precise inline SVG engine */}
        <a href="#" className={styles.logo}>
          <LogoSync3 className="w-auto h-4 md:h-5" />
        </a>

        {/* Desktop elements layout grouping links */}
        <div className={styles.navRight}>
          <ul className={styles.links}>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={styles.link}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile hamburger */}
        <button
          className={styles.burger}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
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
        </button>
      </nav>

      {/* Mobile drawer layout config */}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}>
        <ul className={styles.drawerLinks}>
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={styles.drawerLink}
                onClick={closeMenu}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {menuOpen && <div className={styles.overlay} onClick={closeMenu} />}
    </>
  );
}
