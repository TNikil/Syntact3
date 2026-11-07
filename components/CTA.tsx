// CTA.tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import AnimatedText from '@/components/AnimatedText';
import styles from './CTA.module.css';

const ease = [0.25, 1, 0.5, 1] as const;

export default function CTA() {
  const prefersReduced = useReducedMotion();

  return (
    <section className={styles.section} id="contact">
      <div className={styles.inner}>
        <motion.div
          className={styles.headlineGlass}
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
        >
          <AnimatedText
            as="h2"
            className={styles.headline}
            text={[
              'Got a project in mind? ',
              <em key="accent" className={styles.accent}>
                Let&apos;s talk.
              </em>,
            ]}
            wordDelay={0.07}
            delay={0.1}
          />
        </motion.div>

        <div className={styles.rightColumn}>
          <div className={styles.infoDeck}>
            <motion.div
              className={styles.infoGroup}
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease, delay: 0.25 }}
            >
              <span className={styles.infoLabel}>Current Availability</span>
              <p className={styles.infoValue}>
                Now booking new projects for Q3 2026
              </p>
            </motion.div>

            <motion.div
              className={styles.infoGroup}
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease, delay: 0.35 }}
            >
              <span className={styles.infoLabel}>Presence</span>
              <p className={styles.infoValue}>Sri Lanka &amp; Dubai</p>
            </motion.div>
          </div>

          <motion.div
            className={styles.actions}
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease, delay: 0.5 }}
          >
            <a
              href="https://wa.me/94711368724?text=Hi%20there!%20I%27d%20like%20to%20discuss%20a%20project."
              className={styles.btnWhite}
              target="_blank"
              rel="noopener noreferrer"
            >
              WHATSAPP
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
