import styles from './CTA.module.css';

export default function CTA() {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.inner}>
        <h2 className={styles.headline}>
          Got a project<br />in mind?<br />Let&apos;s talk.
        </h2>
        <div className={styles.actions}>
          <a href="mailto:hello@syntac.com" className={styles.btnWhite}>
            hello@syntac.com
          </a>
          <p className={styles.sub}>or reach us on WhatsApp</p>
        </div>
      </div>
    </section>
  );
}
