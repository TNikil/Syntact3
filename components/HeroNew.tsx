// HeroNew.tsx
'use client';

import styles from './HeroNew.module.css';
import { motion, Variants } from 'framer-motion';

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function HeroNew() {
  return (
    <section className={styles.hero}>
      {/* 1. Full-Screen Video Background */}
      <div className={styles.videoBackground}>
        <video autoPlay muted loop playsInline className={styles.bgVideo}>
          <source src="/videos/sample_3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay for contrast and readability */}
        <div className={styles.videoOverlay} />
      </div>

      {/* 2. Glassmorphism Content Overlay Layer on top of the Video */}
      <div className={styles.innerOverlay}>
        <div className={styles.glassCard}>
          <motion.p
            className={styles.tag}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
          >
            Web Dev &amp; Graphic Design Agency
          </motion.p>

          <motion.h1
            className={styles.headline}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            transition={{ delay: 0.1 }}
          >
            WE DESIGN.
            <br />
            WE BUILD.
            <br />
            <em className={styles.accent}>WE DELIVER.</em>
          </motion.h1>

          <motion.p
            className={styles.desc}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            transition={{ delay: 0.2 }}
          >
            Syntac3 is a creative Agency crafting bold digital experiences —
            from pixel-perfect designs to powerful web builds.
          </motion.p>

          <motion.div
            className={styles.cta}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            transition={{ delay: 0.3 }}
          >
            <a href="#services" className={styles.btnPrimary}>
              Our Services
            </a>
            <a href="#contact" className={styles.btnGhost}>
              Get In Touch →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
