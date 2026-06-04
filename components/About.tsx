import styles from './About.module.css';

const stats = [
  { num: '50+', label: 'Projects Completed' },
  { num: '100%', label: 'Satisfaction Rate' },
  { num: '4', label: 'Creative Minds' },
  { num: '3+', label: 'Years of Excellence' },
];

const team = [
  { 
    initials: 'TN', 
    name: 'Toash Nikil', 
    role: 'Lead Developer', 
    image: '/images/toash.jpg', 
    linkedin: 'https://linkedin.com/in/your-profile' 
  },
  { 
    initials: 'SB', 
    name: 'Sanjaya Bandara', 
    role: 'Lead Developer', 
    image: '/team/sanjaya.jpg',
    linkedin: 'https://www.linkedin.com/in/sanjaya-senarathne-3658273a/' 
  },
  { 
    initials: 'HP', 
    name: 'Hector Perers', 
    role: 'copywriter', 
    image: '/images/hector.jpg', 
    linkedin: 'https://linkedin.com/in/hector' 
  },
  { 
    initials: 'EB', 
    name: 'Eranga Balasingham', 
    role: 'Graphic Designer', 
    image: '/images/eranga.jpg', 
    linkedin: 'https://linkedin.com/in/eranga' 
  },
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
                
                {/* Profile Image */}
                <img src={t.image} alt={t.name} className={styles.teamImage} />

                {/* Text Content Container */}
                <div className={styles.teamInfo}>
                  <p className={styles.teamName}>{t.name}</p>
                  <p className={styles.teamRole}>{t.role}</p>
                  
                  {/* LinkedIn Anchor Tag */}
                  <a href={t.linkedin} target="_blank" rel="noopener noreferrer" className={styles.linkedinLink}>
                    <svg className={styles.linkedinIcon} viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>

                {/* Big Initials (Kept in background) */}
                <span className={styles.teamInitial}>{t.initials}</span>
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
