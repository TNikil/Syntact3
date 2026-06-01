'use client';

import { useState } from 'react';
import styles from './Work.module.css';

const projects = [
  { name: 'Travel Agency', type: 'Web', year: '2024', desc: 'Full brand identity and booking platform for a boutique travel company.' },
  { name: 'Grace Portfolio', type: 'Web', year: '2024', desc: 'Minimal portfolio site for a photographer with custom gallery and CMS.' },
  { name: 'Music Party', type: 'Poster', year: '2023', desc: 'Bold event poster series for an underground music collective.' },
  { name: 'Lotus Beverage', type: 'Logo', year: '2023', desc: 'Clean logo and packaging system for an organic beverage brand.' },
  { name: 'Rian Rest Apartment', type: 'Web', year: '2023', desc: 'Airbnb-style listing site with booking flow for a luxury apartment.' },
  { name: 'Zephyr Brand Kit', type: 'Logo', year: '2024', desc: 'Complete visual identity system including logo, colors, and typography.' },
];

const filters = ['All', 'Web', 'Logo', 'Poster', 'Flyer'];

export default function Work() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? projects
    : projects.filter((p) => p.type === active);

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
        {filtered.map((p, i) => (
          <div className={styles.item} key={p.name}>
            <div className={styles.itemLeft}>
              <span className={styles.num}>0{i + 1}</span>
              <div>
                <h3 className={styles.projectName}>{p.name}</h3>
                <p className={styles.projectDesc}>{p.desc}</p>
              </div>
            </div>
            <div className={styles.itemRight}>
              <span className={styles.type}>{p.type}</span>
              <span className={styles.year}>{p.year}</span>
              <a href="#" className={styles.arrow}>→</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
