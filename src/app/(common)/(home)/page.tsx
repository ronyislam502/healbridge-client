import Hero from '@/components/pages/home/Hero';
import Specialties from '@/components/pages/home/Specialties';
import Doctors from '@/components/pages/home/Doctors';
import WhyChooseUs from '@/components/pages/home/WhyChooseUs';
import Stats from '@/components/pages/home/Stats';
import Testimonials from '@/components/pages/home/Testimonials';
import Process from '@/components/pages/home/Process';
import HealthApp from '@/components/pages/home/HealthApp';
import AiSuggestion from '@/components/pages/home/AiSuggestion';



const Home = () => {
  return (
    <main>
      <Hero />
      <Stats />
      <Process />
      <Specialties />
      <WhyChooseUs />
      <AiSuggestion />
      <Doctors />
      <Testimonials />
      <HealthApp />
    </main>
  );
};

export default Home;