import React from 'react';
import AboutHero from './components/AboutHero';
import AboutSection from './components/AboutSection';
import AboutStats from './components/AboutStats';
import AboutTestimonials from './components/AboutTestimonials';
import AboutProcess from './components/AboutProcess';
import AboutTeam from './components/AboutTeam';

const AboutPage = () => {
  return (
    <main>
      <AboutHero />
      <AboutSection />
      <AboutProcess />
      <AboutStats />
      <AboutTeam />
      <AboutTestimonials />
    </main>
  );
};

export default AboutPage;