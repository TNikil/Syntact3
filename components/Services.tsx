import styles from './Services.module.css';

const services = [
  {
    num: '01',
    name: 'Web Design & Development',
    desc: 'We build websites that go beyond good — they convert and perform.',
    items: [
      'Strong Portfolio & Case Studies',
      'SEO-Friendly & Fast Websites',
      'Modern Design & UX Expertise',
      'Ongoing Support & Maintenance',
      'Digital Marketing Integration',
    ],
  },
  {
    num: '02',
    name: 'Branding & Identity Exploration',
    desc: 'We craft identities that are memorable, consistent, and unmistakably yours.',
    items: [
      'Brand Discovery & Research',
      'Logo & Visual Identity Design',
      'Brand Voice & Messaging',
      'Brand Guidelines / Style Guide',
      'Brand Applications & Launch Strategy',
    ],
  },
  {
    num: '03',
    name: 'Creative Design',
    desc: 'Unleashing creative freedom to every touchpoint of your brand\'s visual world.',
    items: [
      'Creative Visual Design',
      'Video Production & Editing',
      'Animation & Motion Graphics',
      'Interactive Experiences',
      'Storytelling & Campaign Integration',
    ],
  },
];

export default function Services() {
  return (
    <section className={styles.section} id="services">
      <p className={styles.tag}>What We Do</p>
      <h2 className={styles.headline}>
        Services built for<br />bold brands.
      </h2>
      <div className={styles.grid}>
        {services.map((s) => (
          <div className={styles.card} key={s.num}>
            <p className={styles.num}>{s.num}</p>
            <h3 className={styles.cardName}>{s.name}</h3>
            <p className={styles.cardDesc}>{s.desc}</p>
            <ul className={styles.list}>
              {s.items.map((item) => (
                <li key={item} className={styles.listItem}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
