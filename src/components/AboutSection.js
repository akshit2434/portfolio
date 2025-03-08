'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ForceGraphSkills from './ForceGraphSkills';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );

      // Content animation
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            once: true
          }
        }
      );

      // Skills animation
      gsap.fromTo(skillsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 75%',
            once: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="section" ref={sectionRef}>
      <div className="section-content">
        <h2
          ref={titleRef}
          className="section-title"
          style={{
            marginBottom: '1.5rem',
            color: 'var(--text-color)',
            fontSize: '2rem',
            fontWeight: 600,
            opacity: 0
          }}
        >
          About Me
        </h2>

        <div ref={contentRef} className="about-content" style={{ opacity: 0, marginBottom: '2rem' }}>
          <p style={{
            fontSize: '1.05rem',
            lineHeight: 1.6,
            color: 'var(--text-color)',
            opacity: 0.9,
            marginBottom: '1.25rem'
          }}>
            I'm a CSE student at JIIT, passionate about exploring and creating in the world of technology.
            Currently diving deep into AI Technologies and RAG Agents, I'm always excited to learn and
            implement new technologies.
          </p>

          <p style={{
            fontSize: '1.05rem',
            lineHeight: 1.6,
            color: 'var(--text-color)',
            opacity: 0.9
          }}>
            My expertise spans HTML, CSS, JavaScript, React, Python, C++, Node.js, and more.
            I've contributed to various open-source projects and developed multiple successful
            web applications, including freelance projects.
          </p>
        </div>

        <div ref={skillsRef} style={{ opacity: 0 }}>
          <h3 style={{
            color: 'var(--accent-color)',
            marginBottom: '1rem',
            fontSize: '1.4rem',
            fontWeight: 600
          }}>
            Skills
          </h3>
          <ForceGraphSkills />
        </div>
      </div>
    </section>
  );
}