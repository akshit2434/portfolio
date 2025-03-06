'use client';

import Cursor from '../components/Cursor';
import Navbar from '../components/Navbar';
import Noise from '../components/Noise';
import Particles from '../components/Particles';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';

export default function Home() {
  return (
    <>
      <Cursor />
      <Navbar />
      <Noise />
      <Particles />
      <main className="main-content">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
      </main>
    </>
  );
}
