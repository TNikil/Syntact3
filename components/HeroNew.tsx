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
              exposure={0.85}
              toneMapping={4} // ACESFilmic for striking contrast
              controls={true}
            >
              {/* Pitch-dark environment preset with minimal bleed */}
              <Environment
                preset="night"
                background={false}
                environmentIntensity={0.05}
              />

              {/* Minimal ambient light so unlit areas stay completely black */}
              <ambientLight intensity={0.83} />

              {/* --- ONLY THE BLUE THEATER SPOTLIGHT --- */}

              <spotLight
                position={[2, 4, 3]}
                angle={0.45}
                penumbra={0.9}
                intensity={180}
                color="#416e92"
                distance={15}
                castShadow
              />

              {/* Optional subtle rim backlight for edge separation */}
              <spotLight
                position={[-2, 4, -3]}
                angle={0.6}
                penumbra={1}
                intensity={40}
                color="#ea8b4c"
              />

              {/* The 3D Model with Dual Slow-Motion Videos */}
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
