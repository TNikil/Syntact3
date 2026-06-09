import styles from './CTA.module.css';

export default function CTA() {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.inner}>
        <h2 className={styles.headline}>
          Got a project<br />in mind?<br />Let&apos;s talk.
        </h2>
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
    </section>
  );
}
