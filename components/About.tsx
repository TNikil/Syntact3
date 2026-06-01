import styles from './About.module.css';

const stats = [
  { num: '50+', label: 'Projects Completed' },
  { num: '100%', label: 'Satisfaction Rate' },
  { num: '4', label: 'Creative Minds' },
  { num: '3+', label: 'Years of Excellence' },
];

const team = [
  { initials: 'TN', name: 'Toash Nikil', role: 'Lead Developer' },
  { initials: 'SB', name: 'Sanajaya Bandara', role: 'Lead Developer' },
  { initials: 'HP', name: 'Hector Perera', role: 'Copywritter' },
  { initials: 'EB', name: 'Eranga Balasingham', role: 'Graphic Designer' },
];

export default function About() {
  return (
    <section className={styles.section} id="about">
      <div className={styles.grid}>

        {/* Left: text + team */}
        <div className={styles.left}>
          <p className={styles.tag}>Who We Are</p>
          <h2 className={styles.headline}>
            A small team.<br />
            <em className={styles.accent}>Big ideas.</em>
          </h2>
          <p className={styles.desc}>
            Syntac is a boutique creative studio built by a tight-knit crew of
            developers, designers, and storytellers. Every project gets our full
            creative firepower.
          </p>
          <div className={styles.teamGrid}>
            {team.map((t) => (
              <div className={styles.teamCard} key={t.name}>
                <span className={styles.teamInitial}>{t.initials}</span>
                <p className={styles.teamName}>{t.name}</p>
                <p className={styles.teamRole}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: stats */}
        <div className={styles.right}>
          <div className={styles.statsGrid}>
            {stats.map((s) => (
              <div className={styles.statItem} key={s.label}>
                <p className={styles.statNum}>{s.num}</p>
                <p className={styles.statLabel}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
