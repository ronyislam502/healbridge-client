import React from 'react';
import AboutHero from './components/AboutHero';
import AboutSection from './components/AboutSection';
import AboutVisionMission from './components/AboutVisionMission';
import AboutStats from './components/AboutStats';
import AboutProcess from './components/AboutProcess';
import AboutTeam from './components/AboutTeam';

const AboutPage = () => {
  return (
    <main>
      <AboutHero />
      <AboutSection />
      <AboutVisionMission />
      <AboutProcess />
      <AboutStats />
      <AboutTeam />
    </main>
  );
};

export default AboutPage;