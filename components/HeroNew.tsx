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
        {/* Left Content Side - EXACT text from your old hero */}
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

        {/* Right Object Side - 3D Model */}
        <div className={styles.objectSide}>
          <div className={styles.renderAsset}>
            <TestCanvas
              cameraPosition={[0, 0, 6]}
              cameraFov={25}
              exposure={0.8}
              toneMapping={0}
              controls={true}
            >
              <Environment
                preset="studio"
                background={false}
                environmentIntensity={0.3}
              />
              <ambientLight intensity={0.2} />
              <Model
                scale={0.4}
                enableRotation={false}
                enableParallax={true}
                enableFade={true}
                preserveMaterials={true}
                preserveLights={true}
                environmentIntensity={0.3}
                exposure={1.0}
                tvVideoUrl="/videos/sample.mp4"
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
