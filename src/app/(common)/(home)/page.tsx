import Hero from '@/components/pages/home/Hero';
import Specialties from '@/components/pages/home/Specialties';
import Doctors from '@/components/pages/home/Doctors';
import WhyChooseUs from '@/components/pages/home/WhyChooseUs';
import Stats from '@/components/pages/home/Stats';
import Testimonials from '@/components/pages/home/Testimonials';
import HomeCTA from '@/components/pages/home/HomeCTA';
import Process from '@/components/pages/home/Process';
import HealthApp from '@/components/pages/home/HealthApp';
import { AIDoctorSuggestion } from '@/app/(dashbord)/patient/_components/AIDoctorSuggestion';

const Home = () => {
  return (
    <main>
      <Hero />
      <Stats />
      <Process />
      <Specialties />
      <WhyChooseUs />
      <HealthApp />
      
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 max-w-6xl">
          <AIDoctorSuggestion />
        </div>
      </section>

      <Doctors />
      <Testimonials />
      <HomeCTA />
    </main>
  );
};

export default Home;