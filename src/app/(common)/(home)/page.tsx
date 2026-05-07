import Hero from '@/components/sections/Hero';
import Specialties from '@/components/sections/Specialties';
import Doctors from '@/components/sections/Doctors';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import React from 'react';

const Home = () => {
  return (
    <main>
      <Hero />
      <Specialties />
      <Doctors />
      <WhyChooseUs />
      {/* Add more sections here */}
    </main>
  );
};

export default Home;