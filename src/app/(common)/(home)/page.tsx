import Hero from '@/components/pages/home/Hero';
import QuickActions from '@/components/pages/home/QuickActions';
import Specialties from '@/components/pages/home/Specialties';
import Doctors from '@/components/pages/home/Doctors';
import TopRatedDoctors from '@/components/pages/home/TopRatedDoctors';
import WhyChooseUs from '@/components/pages/home/WhyChooseUs';
import Stats from '@/components/pages/home/Stats';
import Testimonials from '@/components/pages/home/Testimonials';
import Process from '@/components/pages/home/Process';
import FAQ from '@/components/pages/home/FAQ';
import HealthApp from '@/components/pages/home/HealthApp';
import AiSuggestion from '@/components/pages/home/AiSuggestion';



const Home = () => {
  return (
    <main>
      <Hero />
      <QuickActions />
      <Stats />
      <Process />
      <Specialties />
      <WhyChooseUs />
      <AiSuggestion />
      <Doctors />
      <TopRatedDoctors />
      <Testimonials />
      <FAQ />
      <HealthApp />
    </main>
  );
};

export default Home;