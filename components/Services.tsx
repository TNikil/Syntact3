// Services.tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import AnimatedText from '@/components/AnimatedText';
import styles from './Services.module.css';

const services = [
  {
    num: '01',
    name: 'Web Design & Development',
    desc: 'We build websites that go beyond good — they convert and perform.',
    items: [
      'Strong Portfolio & Case Studies',
      'SEO-Friendly & Fast Websites',
      'Modern Design & UX Expertise',
      'Ongoing Support & Maintenance',
      'Digital Marketing Integration',
    ],
  },
  {
    num: '02',
    name: 'Branding & Identity Exploration',
    desc: 'We craft identities that are memorable, consistent, and unmistakably yours.',
    items: [
      'Brand Discovery & Research',
      'Logo & Visual Identity Design',
      'Brand Voice & Messaging',
      'Brand Guidelines / Style Guide',
      'Brand Applications & Launch Strategy',
    ],
  },
  {
    num: '03',
    name: 'Creative Design',
    desc: "Unleashing creative freedom to every touchpoint of your brand's visual world.",
    items: [
      'Creative Visual Design',
      'Video Production & Editing',
      'Animation & Motion Graphics',
      'Interactive Experiences',
      'Storytelling & Campaign Integration',
    ],
  },
];

export default function Services() {
  const prefersReduced = useReducedMotion();

  return (
    <section className={styles.section} id="services">
      <div className={styles.glassHeaderContainer}>
        <p className={styles.tag}>What We Do</p>
        <AnimatedText
          as="h2"
          className={styles.headline}
          text={[
            'Services built for ',
            <em key="accent" className={styles.accent}>
              bold brands.
            </em>,
          ]}
        />
      </div>

      <div className={styles.grid}>
        {services.map((s, i) => (
          <motion.div
            className={styles.card}
            key={s.num}
            initial={prefersReduced ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 0.6,
              ease: [0.25, 1, 0.5, 1],
              delay: prefersReduced ? 0 : i * 0.1,
            }}
          >
            <p className={styles.num}>{s.num}</p>
            <h3 className={styles.cardName}>{s.name}</h3>
            <p className={styles.cardDesc}>{s.desc}</p>
            <ul className={styles.list}>
              {s.items.map((item, j) => (
                <motion.li
                  key={item}
                  className={styles.listItem}
                  initial={prefersReduced ? false : { opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 1, 0.5, 1],
                    delay: prefersReduced ? 0 : i * 0.1 + j * 0.04,
                  }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
