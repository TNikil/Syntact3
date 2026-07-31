// HeroNew.tsx
'use client';

import styles from './HeroNew.module.css';
import TestCanvas from '../components/TestCanvas';
import Model from '../components/Model';
import { motion, Variants } from 'framer-motion';
import { Environment } from '@react-three/drei';

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function HeroNew() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        {/* Left Content Side */}
        <div className={styles.contentSide}>
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

        {/* Right Object Side */}
        <div className={styles.objectSide}>
          <div className={styles.renderAsset}>
            <TestCanvas
              cameraPosition={[0, 0, 6]}
              cameraFov={25}
              exposure={1.1}
              toneMapping={4} // ACESFilmic
              controls={true}
            >
              {/* Slightly brighter environment fill */}
              <Environment
                preset="city"
                background={false}
                environmentIntensity={0.4}
              />

              {/* Soft overall ambient light to lift deep shadows */}
              <ambientLight intensity={0.4} />

              {/* --- BRIGHTER THEATER SPOTLIGHTS --- */}

              {/* 1. Main Key Spotlight (Top Front-Right) */}
              <spotLight
                position={[4, 6, 4]}
                angle={0.6}
                penumbra={0.8}
                intensity={25}
                color="#ffffff"
                castShadow
              />

              {/* 2. Fill Spotlight (Top Front-Left) */}
              <spotLight
                position={[-4, 5, 3]}
                angle={0.7}
                penumbra={1}
                intensity={15}
                color="#a0c0ff"
              />

              {/* 3. Dramatic Rim / Backlight (Behind the model) */}
              <spotLight
                position={[0, 5, -5]}
                angle={0.8}
                penumbra={0.5}
                intensity={30}
                color="#fff5ee"
              />

              {/* The 3D Model */}
              <Model
                scale={0.4}
                tvVideoUrl="/videos/sample_2.mp4"
                tvTwoVideoUrl="/videos/sample.mp4"
                playbackRate={0.3}
                tvMuted={true}
                tvLoop={true}
              />
            </TestCanvas>
          </div>
        </div>
      </div>
    </section>
  );
}
