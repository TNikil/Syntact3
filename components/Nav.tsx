'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    
    // Core listener hook for Google engine setup
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,ar',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  // Fires the manual drop-down dispatch event for translation
  const handleTranslate = (langCode: string) => {
    // Fallback logic for localhost cookie synchronization
    if (window.location.hostname === 'localhost') {
      document.cookie = `googtrans=/en/${langCode}; path=/;`;
    }

    const selectEl = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (selectEl) {
      selectEl.value = langCode;
      selectEl.dispatchEvent(new Event('change'));
      setCurrentLang(langCode);
    }

    // Refresh constraint exclusively on localized workflows
    if (window.location.hostname === 'localhost') {
      window.location.reload();
    }
  };

  return (
    <>
      {/* Target selector placeholder hook required by Google API */}
      <div id="google_translate_element" style={{ display: 'none' }} />

      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        {/* Logo wrapper using your precise inline SVG engine */}
        <a href="#" className={styles.logo}>
          <LogoSync3 className="w-auto h-4 md:h-5" />
        </a>

        {/* Desktop elements layout grouping links + translation toggles */}
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
          
          {/* Main Desktop Language Controls */}
          <div className={styles.langSwitchDesktop}>
            <button 
              className={`${styles.langBtn} ${currentLang === 'en' ? styles.langActive : ''}`} 
              onClick={() => handleTranslate('en')}
            >
              EN
            </button>
            <span className={styles.langDivider}>/</span>
            <button 
              className={`${styles.langBtn} ${currentLang === 'ar' ? styles.langActive : ''}`} 
              onClick={() => handleTranslate('ar')}
            >
              AR
            </button>
          </div>
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

        {/* Bottom anchor language toggle inside mobile display */}
        <div className={styles.langSwitchMobile}>
          <button 
            className={`${styles.langBtnMobile} ${currentLang === 'en' ? styles.langActiveMobile : ''}`} 
            onClick={() => { handleTranslate('en'); closeMenu(); }}
          >
            EN
          </button>
          <span className={styles.langDividerMobile}>/</span>
          <button 
            className={`${styles.langBtnMobile} ${currentLang === 'ar' ? styles.langActiveMobile : ''}`} 
            onClick={() => { handleTranslate('ar'); closeMenu(); }}
          >
            AR
          </button>
        </div>
      </div>
      {menuOpen && <div className={styles.overlay} onClick={closeMenu} />}
    </>
  );
}
