import Nav from '@/components/Nav';
import Marquee from '@/components/Marquee';
import Work from '@/components/Work';
import Services from '@/components/Services';
import About from '@/components/About';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import HeroNew from '@/components/HeroNew';

export default function Home() {
  return (
    <main>
      <Nav />
      <HeroNew />
      <Marquee />
      <Work />
      <Services />
      <About />
      <CTA />
      <Footer />
    </main>
  );
}
