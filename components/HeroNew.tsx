import styles from './HeroNew.module.css';

export default function HeroNew() {
  return (
    <section className={styles.hero}>
      {/* Full-screen background video */}
      <video
        src="/hero-object.webm"
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        className={styles.bgVideo}
      />

      {/* Dark overlay for text readability */}
      <div className={styles.overlay}></div>

      {/* Content on top of video */}
      <div className={styles.inner}>
        <div className={styles.contentSide}>
          <p className={styles.tag}>Web Dev &amp; Graphic Design Agency</p>
          <h1 className={styles.headline}>
            WE DESIGN.
            <br />
            WE BUILD.
            <br />
            <em className={styles.accent}>WE DELIVER.</em>
          </h1>
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
        </div>
      </div>
    </section>
  );
}
