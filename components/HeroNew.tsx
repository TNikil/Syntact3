// HeroNew.tsx
'use client';

import { useRef, useEffect } from 'react';
import styles from './HeroNew.module.css';
import { motion, Variants } from 'framer-motion';

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function HeroNew() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Sets the video playback rate to slow motion (e.g., 0.5x speed)
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <section className={styles.hero}>
      {/* 1. Full-Screen Video Background with Slow Motion & Object-Fit Contain adjustments */}
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
        {/* Soft gradient vignette to keep video visible */}
        <div className={styles.videoOverlay} />
      </div>

      {/* 2. Airy Content Layer */}
      <div className={styles.innerOverlay}>
        <div className={styles.contentWrapper}>
          <motion.div
            className={styles.tagWrapper}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
          >
            <span className={styles.tag}>
              Web Dev &amp; Graphic Design Agency
            </span>
          </motion.div>

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

          <motion.div
            className={styles.bottomSplit}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            transition={{ delay: 0.2 }}
          >
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
      </div>
    </section>
  );
}
