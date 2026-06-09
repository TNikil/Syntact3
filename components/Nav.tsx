'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Nav.module.css';
import LogoSync3 from './icons/LogoSyn3';

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        {/* Logo wrapper targeting the updated flex layout container */}
        <a href="#" className={styles.logo}>
          <LogoSync3 className="w-auto h-4 md:h-5" />
        </a>

        {/* Desktop links */}
        <ul className={styles.links}>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={styles.link}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

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

      {/* Mobile drawer */}
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
