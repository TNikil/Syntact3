import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        {/* Left Content Side */}
        <div className={styles.contentSide}>
          <p className={styles.tag}>Web Dev &amp; Graphic Design Studio</p>
          <h1 className={styles.headline}>
            We design.
            <br />
            We build.
            <br />
            <em className={styles.accent}>We deliver.</em>
          </h1>
          <p className={styles.desc}>
            Syntac is a boutique creative studio crafting bold digital
            experiences — from pixel-perfect designs to powerful web builds.
          </p>
          <div className={styles.cta}>
            <a href="#work" className={styles.btnPrimary}>
              See Our Work
            </a>
            <a href="#contact" className={styles.btnGhost}>
              Get In Touch →
            </a>
          </div>
        </div>

        {/* Right Object Side */}
        <div className={styles.objectSide}>
          <video
            src="/hero-object.webm"
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            className={styles.renderAsset}
          />
        </div>
      </div>
    </section>
  );
}
