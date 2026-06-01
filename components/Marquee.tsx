import styles from './Marquee.module.css';

const words = [
  'Web Design', 'Branding', 'Development', 'Motion',
  'Identity', 'Syntac', 'Strategy', 'Creative',
];

export default function Marquee() {
  // Duplicate for seamless loop
  const items = [...words, ...words, ...words];

  return (
    <div className={styles.strip}>
      <div className={styles.track}>
        {items.map((w, i) => (
          <span key={i} className={styles.item}>
            {w}
            <span className={styles.dot}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
