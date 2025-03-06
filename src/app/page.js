'use client';

import { useEffect } from 'react';
import Cursor from '../components/Cursor';
import Navbar from '../components/Navbar';
import Noise from '../components/Noise';
import Particles from '../components/Particles';

export default function Home() {
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.2
    });

    document.querySelectorAll('.section-content').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Cursor />
      <Navbar />
      <Noise />
      <Particles />
      <main className="main-content">
        <section id="home" className="section hero-section">
          <div className="hero-content">
            <div className="hero-text-content">
              <h1 className="hero-text">
                Hi, I&apos;m Akshit Kumar Singh
              </h1>
              <p className="hero-subtext">
                A Software Developer passionate about creating immersive web experiences
              </p>
            </div>
            <div className="hero-image">
              <div className="profile-container">
                <div className="profile-shape" />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="section-content">
            <h2 className="section-title">
              About Me
            </h2>
            <div className="section-text" style={{ display: 'grid', gap: '2rem' }}>
              <p>
                I specialize in creating unique digital experiences with attention to detail and smooth interactions.
                My approach combines creative design with efficient development practices.
              </p>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '2rem',
                marginTop: '1rem'
              }}>
                <div>
                  <h3 style={{ marginBottom: '1rem', color: 'var(--accent-color)' }}>Frontend</h3>
                  <ul style={{ listStyle: 'none', display: 'grid', gap: '0.5rem' }}>
                    <li>React & Next.js</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS</li>
                  </ul>
                </div>
                <div>
                  <h3 style={{ marginBottom: '1rem', color: 'var(--accent-color)' }}>Backend</h3>
                  <ul style={{ listStyle: 'none', display: 'grid', gap: '0.5rem' }}>
                    <li>Node.js</li>
                    <li>Python</li>
                    <li>MongoDB</li>
                  </ul>
                </div>
                <div>
                  <h3 style={{ marginBottom: '1rem', color: 'var(--accent-color)' }}>Tools</h3>
                  <ul style={{ listStyle: 'none', display: 'grid', gap: '0.5rem' }}>
                    <li>Git & GitHub</li>
                    <li>VS Code</li>
                    <li>Figma</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="section">
          <div className="section-content">
            <h2 className="section-title">
              Featured Projects
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginTop: '2rem'
            }}>
              {[1, 2, 3].map((_, i) => (
                <div key={i} style={{
                  background: 'var(--glass-bg)',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  border: '1px solid var(--glass-border)',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <h3 style={{ marginBottom: '1rem', color: 'var(--accent-color)' }}>
                    Project {i + 1}
                  </h3>
                  <p style={{ opacity: 0.8, marginBottom: '1rem' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed do eiusmod tempor incididunt ut labore.
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    gap: '0.5rem', 
                    flexWrap: 'wrap'
                  }}>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      background: 'var(--glass-bg)', 
                      borderRadius: '15px',
                      fontSize: '0.9rem',
                      border: '1px solid var(--glass-border)'
                    }}>
                      React
                    </span>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      background: 'var(--glass-bg)', 
                      borderRadius: '15px',
                      fontSize: '0.9rem',
                      border: '1px solid var(--glass-border)'
                    }}>
                      Node.js
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
