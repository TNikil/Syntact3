import styles from './CTA.module.css';

export default function CTA() {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.inner}>
        <h2 className={styles.headline}>
          Got a project<br />in mind?<br />Let&apos;s talk.
        </h2>
        
        <div className={styles.rightColumn}>
          <div className={styles.infoDeck}>
            <div className={styles.infoGroup}>
              <span className={styles.infoLabel}>Current Availability</span>
              <p className={styles.infoValue}>Now booking new projects for Q3 2026</p>
            </div>
            
            <div className={styles.infoGroup}>
              <span className={styles.infoLabel}>Presence</span>
              <p className={styles.infoValue}>Sri Lanka &amp; Dubai</p>
            </div>
          </div>

          <div className={styles.actions}>
            <a 
              href="https://wa.me/94711368724?text=Hi%20there!%20I%27d%20like%20to%20discuss%20a%20project." 
              className={styles.btnWhite}
              target="_blank" 
              rel="noopener noreferrer"
            >
              WHATSAPP
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
