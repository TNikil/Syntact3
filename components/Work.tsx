'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Work.module.css';

const projects = [
  {
    name: 'Grace Flower and More',
    type: 'Web',
    year: '2024',
    country: 'UAE',
    desc: 'Ecommerce florist website to deal across UAE.',
    link: 'https://grace-flower-boutique-2.vercel.app/bouquet/5c350175-6be2-44d4-8264-e969cbe8ff02',
    image: '/images/grace.jpg',
  },
  {
    name: 'Danpest',
    type: 'Web',
    year: '2024',
    country: 'Sri Lanka',
    desc: 'Professional pest control solutions website.',
    link: 'https://www.danpest.com/',
    image: '/images/danpest.jpg',
  },
  {
    name: 'Music Party',
    type: 'Poster',
    year: '2023',
    country: 'Sri Lanka',
    desc: 'Bold event poster series for an underground collective.',
    image: '/images/music-party.jpg',
  },
  {
    name: 'Lotus Beverage',
    type: 'Logo',
    year: '2023',
    country: 'Sri Lanka',
    desc: 'Clean logo and packaging system for an organic brand.',
    image: '/images/lotus-beverage.jpg',
  },
  {
    name: 'Rian Rest Apartment',
    type: 'Web',
    year: '2023',
    country: 'Sri Lanka',
    desc: 'Airbnb-style listing site with booking flow.',
    link: 'https://rianrest.com',
    image: '/images/rianrest.jpg',
  },
  {
    name: 'Zephyr Brand Kit',
    type: 'Logo',
    year: '2024',
    country: 'Sri Lanka',
    desc: 'Complete visual identity system and typography.',
    image: '/images/zephyr-kit.jpg',
  },
  {
    name: 'Blossom Flowers',
    type: 'Web',
    year: '2024',
    country: 'Qatar',
    desc: 'Bespoke digital storefront for an artisan boutique.',
    link: 'https://vandradur.github.io/blossom/',
    image: '/images/blossom.jpg',
  },
  {
    name: 'Verginia honey',
    type: 'Packaging',
    year: '2017',
    country: 'USA',
    desc: 'Custom packaging for US based Honey company.',
    link: 'https://rianrest.com',
    image: '/images/verginia.jpg',
  },
  {
    name: 'Eco souq',
    type: 'Packaging',
    year: '2019',
    country: 'Qatar',
    desc: 'Market product for eco items',
    link: 'https://rianrest.com',
    image: '/images/ecosouq.jpg',
  },
];

const filters = ['Web', 'Logo', 'Poster', 'Flyer', 'Packaging'];

export default function Work() {
  const [active, setActive] = useState('Web');
  const filtered = projects.filter(
    (p) => p.type.toLowerCase() === active.toLowerCase(),
  );

  return (
    <section className={styles.section} id="work">
      <div className={styles.header}>
        <p className={styles.tag}>Our Work</p>
        <h2 className={styles.headline}>
          Work we&apos;re
          <br />
          proud of.
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
          const Wrapper = p.link ? 'a' : 'div';
          return (
            <Wrapper
              key={p.name}
              href={p.link || undefined}
              target={p.link ? '_blank' : undefined}
              rel={p.link ? 'noopener noreferrer' : undefined}
              className={`${styles.item} ${p.link ? styles.linkItem : ''}`}
            >
              <div className={styles.itemLeft}>
                <span className={styles.num}>0{i + 1}</span>
                <div>
                  <h3 className={styles.projectName}>
                    {p.name}
                    {/* Country rendered next to project name */}
                    <span className={styles.inlineCountry}>{p.country}</span>
                  </h3>
                  <p className={styles.projectDesc}>{p.desc}</p>
                </div>
              </div>

              <div className={styles.imagePreview}>
                <Image
                  src={p.image}
                  alt={p.name}
                  width={400}
                  height={250}
                  className={styles.projectImage}
                />
              </div>

              <div className={styles.itemRight}>
                <span className={styles.type}>{p.type}</span>
                <span className={styles.year}>{p.year}</span>
                {p.link && <span className={styles.arrow}>→</span>}
              </div>
            </Wrapper>
          );
        })}
      </div>
    </section>
  );
}
