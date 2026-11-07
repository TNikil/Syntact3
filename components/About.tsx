// About.tsx
'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import AnimatedText from '@/components/AnimatedText';
import styles from './About.module.css';

const stats = [
  { num: '50+', label: 'Projects Completed' },
  { num: '100%', label: 'Satisfaction Rate' },
  { num: '23+', label: 'Years of Excellence' },
];

const team = [
  {
    initials: 'TN',
    name: 'Toash Nikil',
    role: 'Lead Developer',
    image: '/team/nikhil.jpg',
    linkedin: 'https://linkedin.com/in/your-profile',
  },
  {
    initials: 'SB',
    name: 'Sanjaya Bandara',
    role: 'Lead Developer',
    image: '/team/sanjaya.jpg',
    linkedin: 'https://www.linkedin.com/in/sanjaya-senarathne-3658273a/',
  },
  {
    initials: 'HP',
    name: 'Hector Perers',
    role: 'Copywriter',
    image: '/team/hector.jpg',
    linkedin: 'https://linkedin.com/in/hector',
  },
];

const ease = [0.25, 1, 0.5, 1] as const;

export default function About() {
  const prefersReduced = useReducedMotion();

  return (
    <section className={styles.section} id="about">
      <div className={styles.grid}>
        {/* Left: text + team */}
        <div className={styles.left}>
          <p className={styles.tag}>Who We Are</p>

          <AnimatedText
            as="h2"
            className={styles.headline}
            text={[
              'A small team. ',
              <em key="accent" className={styles.accent}>
                Big ideas.
              </em>,
            ]}
          />

          <motion.p
            className={styles.desc}
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease, delay: 0.15 }}
          >
            Syntac is a boutique creative studio built by a tight-knit crew of
            developers, designers, and storytellers. Every project gets our full
            creative firepower.
          </motion.p>

          <div className={styles.teamGrid}>
            {team.map((t, i) => (
              <motion.div
                className={styles.teamCard}
                key={t.name}
                initial={prefersReduced ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.6,
                  ease,
                  delay: prefersReduced ? 0 : 0.2 + i * 0.1,
                }}
              >
                <Image
                  src={t.image}
                  alt={t.name}
                  width={240}
                  height={240}
                  className={styles.teamImage}
                />

                <div className={styles.teamInfo}>
                  <p className={styles.teamName}>{t.name}</p>
                  <p className={styles.teamRole}>{t.role}</p>

                  <a
                    href={t.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkedinLink}
                    aria-label={`${t.name} on LinkedIn`}
                  >
                    <svg className={styles.linkedinIcon} viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>

                <span className={styles.teamInitial}>{t.initials}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: stats */}
        <div className={styles.right}>
          <div className={styles.statsGrid}>
            {stats.map((s, i) => (
              <motion.div
                className={styles.statItem}
                key={s.label}
                initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.55,
                  ease,
                  delay: prefersReduced ? 0 : 0.1 + i * 0.12,
                }}
              >
                <p className={styles.statNum}>{s.num}</p>
                <p className={styles.statLabel}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
