// HeroNew.tsx
'use client';

import { useRef, useEffect } from 'react';
import styles from './HeroNew.module.css';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import AnimatedText from './AnimatedText';

const ease = [0.16, 1, 0.3, 1] as const;

// Tune this ONE value to control how long the video plays before
// any text appears. Try 1.2, 1.8, 2.4, or 3.0.
const HERO_DELAY = 17.4;

// Container orchestrates timing; children fire in sequence.
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: HERO_DELAY,
    },
  },
};

const tagVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

const descVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease, delay: 0.15 },
  },
};

const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease, delay: 0.25 },
  },
};

export default function HeroNew() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <section className={styles.hero}>
      {/* 1. Absolute Full-Screen Video Background — unchanged */}
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
        <div className={styles.videoOverlay} />
      </div>

      {/* 2. Sequenced Content Layer */}
      <motion.div
        className={styles.innerOverlay}
        variants={containerVariants}
        initial={prefersReduced ? 'visible' : 'hidden'}
        animate="visible"
      >
        <div className={styles.contentWrapper}>
          <motion.div variants={tagVariants} className={styles.tagWrapper}>
            <span className={styles.tag}>
              Web Dev &amp; Graphic Design Agency
            </span>
          </motion.div>

          {/* Three locked lines, each word-cascades. Same <br> layout,
              same <h1>, same italic accent — only the animation changed.
              Delays are offset by HERO_DELAY so the cascade fires AFTER
              the parent's opacity transition starts (otherwise the words
              animate invisibly under the hidden parent). */}
          <h1 className={styles.headline}>
            <AnimatedText
              text="WE DESIGN."
              wordDelay={0.08}
              delay={HERO_DELAY + 0.05}
              maskPadY={0.22}
              maskPadX={0.06}
            />
            <br />
            <AnimatedText
              text="WE BUILD."
              wordDelay={0.08}
              delay={HERO_DELAY + 0.25}
              maskPadY={0.22}
              maskPadX={0.06}
            />
            <br />
            <AnimatedText
              text={[
                <em key="accent" className={styles.accent}>
                  WE DELIVER.
                </em>,
              ]}
              wordDelay={0.08}
              delay={HERO_DELAY + 0.45}
              maskPadY={0.22}
              maskPadX={0.06}
            />
          </h1>

          <motion.div variants={descVariants} className={styles.bottomSplit}>
            <p className={styles.desc}>
              Syntac3 is a creative Agency crafting bold digital experiences —
              from pixel-perfect designs to powerful web builds.
            </p>

            <motion.div variants={ctaVariants} className={styles.cta}>
              <a href="#services" className={styles.btnPrimary}>
                Our Services
              </a>
              <a href="#contact" className={styles.btnGhost}>
                Get In Touch →
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
