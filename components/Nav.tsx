'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Nav.module.css';

// Declare custom window types to bypass TypeScript checks for the script
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
    
    // Bind the initialization hook for Google Translate
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

  // Programmatically fires Google's language translation event
  const handleTranslate = (langCode: string) => {
    const selectEl = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (selectEl) {
      selectEl.value = langCode;
      selectEl.dispatchEvent(new Event('change'));
      setCurrentLang(langCode);
    }
  };

  return (
    <>
      {/* Hidden container placeholder required by Google Translate */}
      <div id="google_translate_element" style={{ display: 'none' }} />

      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <a href="#" className={styles.logo}>
          <Image 
            src="/logo.png" 
            alt="Syntac Logo" 
            width={200}
            height={50}
            priority 
            style={{ height: '100%', width: 'auto', objectFit: 'contain' }} 
          />
        </a>

        {/* Desktop links + Language Selector */}
        <div className={styles.navRight}>
          <ul className={styles.links}>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={styles.link}>{l.label}</a>
              </li>
            ))}
          </ul>
          
          {/* Desktop Switcher */}
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
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ''}`} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}>
        <ul className={styles.drawerLinks}>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={styles.drawerLink} onClick={closeMenu}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Switcher at bottom of drawer */}
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
