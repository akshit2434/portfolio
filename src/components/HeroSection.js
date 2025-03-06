'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroSection() {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const textRefs = {
    heading: useRef(null),
    subtext: useRef(null),
    ctaButtons: useRef(null)
  };

  useEffect(() => {
    // Mouse hover effect
    const handleMouseMove = (e) => {
      if (!sectionRef.current || !imageContainerRef.current) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      gsap.to(imageContainerRef.current, {
        x: x * 20,
        y: y * 20,
        scale: 1.05,
        duration: 0.6,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      if (!imageContainerRef.current) return;
      gsap.to(imageContainerRef.current, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out'
      });
    };

    // Initial animations
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    
    tl.fromTo(textRefs.heading.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 }
    ).fromTo(textRefs.subtext.current,
      { opacity: 0, y: 20 },
      { opacity: 0.8, y: 0, duration: 0.8 },
      '-=0.6'
    ).fromTo(textRefs.ctaButtons.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.6'
    );

    // Event listeners for mouse movement
    const heroElement = sectionRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      heroElement.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
        heroElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section id="home" className="section hero-section" ref={sectionRef}>
      <div className="hero-content">
        <div className="hero-text-content">
          <div style={{ overflow: 'hidden' }}>
            <h1 
              ref={textRefs.heading}
              className="hero-text" 
              style={{
                opacity: 0,
                color: 'var(--text-color)',
                fontSize: '2.5rem',
                fontWeight: 600,
                lineHeight: 1.2
              }}
            >
              Hi, I&apos;m Akshit Kumar Singh
            </h1>
          </div>
          
          <div style={{ overflow: 'hidden' }}>
            <p 
              ref={textRefs.subtext}
              className="hero-subtext" 
              style={{
                opacity: 0,
                color: 'var(--text-color)',
                fontSize: '1.2rem',
                marginTop: '1rem',
                lineHeight: 1.6
              }}
            >
              CSE student at JIIT exploring AI Technologies and RAG Agents. Passionate about development, from web apps to AI workflows.
            </p>
          </div>

          <div 
            ref={textRefs.ctaButtons}
            style={{
              marginTop: '2rem',
              display: 'flex',
              gap: '1rem',
              opacity: 0
            }}
          >
            <a
              href="#work"
              className="cta-button primary"
              style={{
                padding: '0.75rem 1.5rem',
                background: 'var(--accent-color)',
                color: 'var(--bg-color)',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '1rem',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  y: -2,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  duration: 0.3
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  y: 0,
                  boxShadow: 'none',
                  duration: 0.3
                });
              }}
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="cta-button secondary"
              style={{
                padding: '0.75rem 1.5rem',
                border: '1px solid var(--accent-color)',
                color: 'var(--accent-color)',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '1rem',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  y: -2,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  duration: 0.3
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  y: 0,
                  boxShadow: 'none',
                  duration: 0.3
                });
              }}
            >
              Contact Me
            </a>
          </div>
        </div>

        <div
          className="hero-image"
          ref={imageContainerRef}
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}
        >
          <div className="profile-container">
            <div className="profile-shape">
              <img
                src="/dp.png"
                alt="Profile"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}