// Work.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Work.module.css';

interface Project {
  name: string;
  type: string;
  year: string;
  country: string;
  desc: string;
  link?: string;
  image?: string;
  video?: string;
}

const projects: Project[] = [
  {
    name: 'Danpest',
    type: 'Web',
    year: '2018',
    country: 'Sri Lanka',
    desc: 'A team of Pest Control and Hygiene industry experts at your service',
    link: 'https://www.danpest.com/',
    image: '/images/danpest.jpg',
  },
  {
    name: 'Rian Rest Apartment',
    type: 'Web',
    year: '2023',
    country: 'Sri Lanka',
    desc: 'Airbnb-style listing site with booking flow. An SLTDA approved sanctuary designed for those who seek tranquility, comfort, and effortless convenience.',
    link: 'https://rianrest.com',
    image: '/images/rianrest.jpg',
  },
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
    name: 'Plaka Cafe',
    type: 'Web',
    year: '2024',
    country: 'UAE',
    desc: 'Ecommerce coffee website',
    link: 'https://www.plakacafe.com/',
    image: '/images/plaka.png',
  },
  {
    name: 'Drift Car Rentals',
    type: 'Web',
    year: '2026',
    country: 'UAE',
    desc: 'A game and website for car rental company in Dubai.',
    link: 'https://drift-rentals-ecru.vercel.app/',
    image: '/images/drift.png',
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
    name: 'Art Festival',
    type: 'Poster',
    year: '2023',
    country: 'Sri Lanka',
    desc: 'Black and White Modern Art Festival Poster.',
    image: '/images/art-festival.jpg',
  },
  {
    name: 'Hiring',
    type: 'Poster',
    year: '2024',
    country: 'Sri Lanka',
    desc: 'we are hiring Poster.',
    image: '/images/hiring.jpg',
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
    name: 'Crevox',
    type: 'Logo',
    year: '2023',
    country: 'Sri Lanka',
    desc: 'Spices packaging company',
    image: '/images/cervox_logo.jpg',
  },
  {
    name: 'Mob BBQ',
    type: 'Logo',
    year: '2019',
    country: 'USA',
    desc: 'BBQ Grill company',
    image: '/images/bbq_logo.jpg',
  },
  {
    name: 'Thaya floral and gourmet',
    type: 'Logo',
    year: '2017',
    country: 'UAE',
    desc: 'Flower, events and landscaping company',
    image: '/images/thaya_logo.jpg',
  },
  {
    name: 'Dan pest',
    type: 'Logo',
    year: '2018',
    country: 'Sri Lanka',
    desc: 'Logo for a eco friendly pest control business',
    image: '/images/danpest_logo.jpg',
  },
  {
    name: 'Rianrest',
    type: 'Logo',
    year: '2025',
    country: 'Sri Lanka',
    desc: 'Sun and beaches represnt this logo',
    image: '/images/rianrest_logo.jpg',
  },
  {
    name: 'Wedding Invitation',
    type: 'Flyer',
    year: '2023',
    country: 'Sri Lanka',
    desc: 'Black and White Retro Save the Date  Wedding Invitation Flyer.',
    image: '/images/wedding-invitation.jpg',
  },
  {
    name: 'Hatti',
    type: 'Logo',
    year: '2024',
    country: 'Sri Lanka',
    desc: 'Complete visual identity system and typography.',
    image: '/images/hatti.jpg',
  },
  {
    name: 'Blossom Flowers',
    type: 'Web',
    year: '2022',
    country: 'Qatar',
    desc: 'Bespoke digital storefront for an artisan boutique.',
    link: 'https://vandradur.github.io/blossom/',
    image: '/images/blossom.jpg',
  },
  {
    name: 'Crevox Spices',
    type: 'Packaging',
    year: '2023',
    country: 'USA',
    desc: 'Custom packaging for US based spices company.',
    image: '/images/cervox.jpg',
  },
  {
    name: 'Verginia honey',
    type: 'Packaging',
    year: '2017',
    country: 'USA',
    desc: 'Custom packaging for US based Honey company.',
    image: '/images/verginia.jpg',
  },
  {
    name: 'Eco souq',
    type: 'Packaging',
    year: '2019',
    country: 'Qatar',
    desc: 'Market product for eco items',
    image: '/images/ecosouq.jpg',
  },
  {
    name: 'Chair 01',
    type: '3D',
    year: '2023',
    country: 'UAE',
    desc: 'Product Visualization for furniture company in Dubai.',
    video: '/videos/classic_chair.mp4',
  },
  {
    name: 'Chair 02',
    type: '3D',
    year: '2023',
    country: 'UAE',
    desc: 'Product Visualization for furniture company in Dubai.',
    video: '/videos/common_chair.mp4',
  },
  {
    name: 'Chair 03',
    type: '3D',
    year: '2023',
    country: 'UAE',
    desc: 'Product Visualization for furniture company in Dubai.',
    video: '/videos/comfi_chair.mp4',
  },
  {
    name: 'Chair 04',
    type: '3D',
    year: '2023',
    country: 'UAE',
    desc: 'Product Visualization for furniture company in Dubai.',
    video: '/videos/wood_chair.mp4',
  },
  {
    name: 'Chair 05',
    type: '3D',
    year: '2023',
    country: 'UAE',
    desc: 'Product Visualization for furniture company in Dubai.',
    video: '/videos/boss_chair.mp4',
  },
  {
    name: 'Chair 06',
    type: '3D',
    year: '2023',
    country: 'UAE',
    desc: 'Product Visualization for furniture company in Dubai.',
    video: '/videos/red_chair.mp4',
  },
  {
    name: 'Chair 07',
    type: '3D',
    year: '2023',
    country: 'UAE',
    desc: 'Product Visualization for furniture company in Dubai.',
    video: '/videos/brown_chair.mp4',
  },
];

const filters = ['Web', '3D', 'Packaging', 'Logo', 'Poster', 'Flyer'];

export default function Work() {
  const [active, setActive] = useState('Web');
  const [selectedMedia, setSelectedMedia] = useState<{
    src: string;
    type: 'image' | 'video';
  } | null>(null);

  const filtered = projects.filter(
    (p) => p.type.toLowerCase() === active.toLowerCase(),
  );

  const handleMediaClick = (
    e: React.MouseEvent,
    src: string,
    type: 'image' | 'video',
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedMedia({ src, type });
  };

  return (
    <section className={styles.section} id="work">
      {/* Frosted Glass Header Container with Modern Pill Filter Controls */}
      <div className={styles.glassHeaderContainer}>
        <div className={styles.header}>
          <p className={styles.tag}>Our Work</p>
          <h2 className={styles.headline}>
            Work we&apos;re
            <br />
            <em className={styles.accent}>proud of.</em>
          </h2>
        </div>

        <div className={styles.filters}>
          {filters.map((f) => (
            <button
              key={f}
              className={`${styles.filterBtn} ${
                active === f ? styles.filterActive : ''
              }`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>
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
                    <span className={styles.inlineCountry}>{p.country}</span>
                  </h3>
                  <p className={styles.projectDesc}>{p.desc}</p>
                </div>
              </div>

              {/* Media Preview (Supports both Videos & Images natively with square 1080x1080 styling) */}
              <div
                className={styles.imagePreview}
                onClick={(e) => {
                  if (p.video) {
                    handleMediaClick(e, p.video, 'video');
                  } else if (p.image) {
                    handleMediaClick(e, p.image, 'image');
                  }
                }}
              >
                {p.video ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={styles.projectVideo}
                  >
                    <source src={p.video} type="video/mp4" />
                  </video>
                ) : p.image ? (
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={400}
                    height={250}
                    className={styles.projectImage}
                  />
                ) : null}
              </div>

              <div className={styles.itemRight}>
                <span className={styles.type}>{p.type}</span>
                <span className={styles.year}>{p.year}</span>
                {p.link && (
                  <span className={styles.ctaText}>
                    View Site <span className={styles.ctaArrow}>→</span>
                  </span>
                )}
              </div>
            </Wrapper>
          );
        })}
      </div>

      {/* Zoom Modal Viewer */}
      {selectedMedia && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedMedia(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={() => setSelectedMedia(null)}
            >
              &times;
            </button>
            <div className={styles.modalMediaWrapper}>
              {selectedMedia.type === 'video' ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  className={styles.modalMedia}
                >
                  <source src={selectedMedia.src} type="video/mp4" />
                </video>
              ) : (
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <Image
                    src={selectedMedia.src}
                    alt="Project preview display zoomed"
                    fill
                    sizes="85vw"
                    className={styles.modalMedia}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
