'use client';

import { useState } from 'react';
import styles from './Work.module.css';

const projects = [
  { 
    name: 'Blossom Flowers', 
    type: 'Web', 
    year: '2024', 
    desc: 'Bespoke digital storefront and curation platform for an artisan floral boutique.',
    link: 'https://vandradur.github.io/blossom/', 
    image: '/images/blossom-flowers.jpg' 
  },
  { 
    name: 'Grace Portfolio', 
    type: 'Web', 
    year: '2024', 
    desc: 'Minimal portfolio site for a photographer with custom gallery and CMS.',
    link: 'https://example.com/grace', 
    image: '/images/grace-portfolio.jpg' 
  },
  { 
    name: 'Music Party', 
    type: 'Poster', 
    year: '2023', 
    desc: 'Bold event poster series for an underground music collective.',
    image: '/images/music-party.jpg' 
  },
  { 
    name: 'Lotus Beverage', 
    type: 'Logo', 
    year: '2023', 
    desc: 'Clean logo and packaging system for an organic beverage brand.',
    image: '/images/lotus-beverage.jpg' 
  },
  { 
    name: 'Rian Rest Apartment', 
    type: 'Web', 
    year: '2023', 
    desc: 'Airbnb-style listing site with booking flow for a luxury apartment.',
    link: 'https://rianrest.com', 
    image: '/images/rian-rest.jpg' 
  },
  { 
    name: 'Zephyr Brand Kit', 
    type: 'Logo', 
    year: '2024', 
    desc: 'Complete visual identity system including logo, colors, and typography.',
    image: '/images/zephyr-kit.jpg' 
  },
];

const filters = ['Web', 'Logo', 'Poster', 'Flyer'];

export default function Work() {
  const [active, setActive] = useState('Web');

  const filtered = projects.filter((p) => p.type.toLowerCase() === active.toLowerCase());

  return (
    <section className={styles.section} id="work">
      <div className={styles.header}>
        <p className={styles.tag}>Our Work</p>
        <h2 className={styles.headline}>
          Work we&apos;re<br />proud of.
        </h2>
      </div>

      <div className={styles.filters}>
        {filters.map((f) => (
          <button
            key={f}
            className={`${styles.filterBtn} ${active === f ? styles.filterActive : ''}`}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filtered.map((p, i) => {
          const isWeb = p.type.toLowerCase() === 'web';
          
          const rowInnerContent = (
            <>
              {/* Left text column */}
              <div className={styles.itemLeft}>
                <span className={styles.num}>0{i + 1}</span>
                <div>
                  <h3 className={styles.projectName}>{p.name}</h3>
                  <p className={styles.projectDesc}>{p.desc}</p>
                </div>
              </div>

              {/* Middle image preview column - ONLY renders if NOT a web item */}
              {!isWeb && (
                <div className={styles.imagePreview}>
                  {p.image ? (
                    <img src={p.image} alt={p.name} />
                  ) : (
                    <div className={styles.placeholder}></div>
                  )}
                </div>
              )}

              {/* Right details column */}
              <div className={styles.itemRight}>
                <span className={styles.type}>{p.type}</span>
                <span className={styles.year}>{p.year}</span>
                <span className={styles.arrow}>→</span>
              </div>
            </>
          );

          if (isWeb) {
            return (
              <a 
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.item} ${styles.linkItem} ${styles.webItem}`} 
                key={p.name}
              >
                {rowInnerContent}
              </a>
            );
          }

          return (
            <div className={styles.item} key={p.name}>
              {rowInnerContent}
            </div>
          );
        })}
      </div>
    </section>
  );
}
