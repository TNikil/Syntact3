// HeroNew.tsx
'use client';

import { useRef, useEffect } from 'react';
import styles from './HeroNew.module.css';
import { motion, Variants } from 'framer-motion';

// Longer cinematic delay so the video plays fully before text appears
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 1.2, // 1.2s pure video showcase before text starts fading in
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HeroNew() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Slow motion
    }
  }, []);

  return (
    <section className={styles.hero}>
      {/* 1. Absolute Full-Screen Video Background */}
      <div className={styles.videoBackground}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className={styles.bgVideo}
        >
          <source src="/videos/sample_3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Subtle cinematic vignette */}
        <div className={styles.videoOverlay} />
      </div>

      {/* 2. Delayed Cinematic Content Layer */}
      <motion.div
        className={styles.innerOverlay}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.contentWrapper}>
          <motion.div variants={itemVariants} className={styles.tagWrapper}>
            <span className={styles.tag}>
              Web Dev &amp; Graphic Design Agency
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className={styles.headline}>
            WE DESIGN.
            <br />
            WE BUILD.
            <br />
            <em className={styles.accent}>WE DELIVER.</em>
          </motion.h1>

          <motion.div variants={itemVariants} className={styles.bottomSplit}>
            <p className={styles.desc}>
              Syntac3 is a creative Agency crafting bold digital experiences —
              from pixel-perfect designs to powerful web builds.
            </p>

            <div className={styles.cta}>
              <a href="#services" className={styles.btnPrimary}>
                Our Services
              </a>
              <a href="#contact" className={styles.btnGhost}>
                Get In Touch →
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
