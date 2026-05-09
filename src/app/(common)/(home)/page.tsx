import Hero from '@/components/pages/home/Hero';
import Specialties from '@/components/pages/home/Specialties';
import Doctors from '@/components/pages/home/Doctors';
import WhyChooseUs from '@/components/pages/home/WhyChooseUs';
import Stats from '@/components/pages/home/Stats';
import Testimonials from '@/components/pages/home/Testimonials';
import HomeCTA from '@/components/pages/home/HomeCTA';
import Process from '@/components/pages/home/Process';
import HealthApp from '@/components/pages/home/HealthApp';

const Home = () => {
  return (
    <main>
      <Hero />
      <Stats />
      <Process />
      <Specialties />
      <WhyChooseUs />
      <HealthApp />
      <Doctors />
      <Testimonials />
      <HomeCTA />
    </main>
  );
};

export default Home;