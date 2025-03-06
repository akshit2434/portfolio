'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = {
  'Full Stack': [
    { name: 'HTML', icon: '🌐' },
    { name: 'CSS', icon: '🎨' },
    { name: 'JavaScript', icon: '📜' },
    { name: 'React', icon: '⚛️' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Python', icon: '🐍' },
    { name: 'MongoDB', icon: '🍃' }
  ],
  'AI & ML': [
    { name: 'LangChain', icon: '🔗' },
    { name: 'LangGraph', icon: '📊' },
    { name: 'LLMs', icon: '🔄' },
    { name: 'Pydantic-AI', icon: '🤖' },
    { name: 'RAG Agents', icon: '🔍' }
  ],
  'Other Skills': [
    { name: 'DSA', icon: '🏆' },
    { name: 'System Design', icon: '💻' },
    { name: 'Three.js', icon: '🎮' },
    { name: 'Git/GitHub', icon: '📂' },
    { name: 'C++', icon: '⚙️' }
  ]
};

function SkillCard({ skill }) {
  return (
    <div
      style={{
        padding: '0.6rem',
        background: 'var(--glass-bg)',
        borderRadius: '8px',
        border: '1px solid var(--glass-border)',
        transition: 'all 0.25s ease',
        cursor: 'default',
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem'
      }}
      onMouseEnter={(e) => {
        gsap.to(e.currentTarget, {
          y: -3,
          scale: 1.02,
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
          background: 'var(--accent-color)',
          color: 'var(--bg-color)',
          duration: 0.25
        });
      }}
      onMouseLeave={(e) => {
        gsap.to(e.currentTarget, {
          y: 0,
          scale: 1,
          boxShadow: 'none',
          background: 'var(--glass-bg)',
          color: 'var(--text-color)',
          duration: 0.25
        });
      }}
    >
      <span style={{ fontSize: '1rem' }}>{skill.icon}</span>
      <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{skill.name}</span>
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const skillsBoxRef = useRef(null);
  const skillCardsRef = useRef([]);

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

      // Skills box animation
      gsap.fromTo(skillsBoxRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: skillsBoxRef.current,
            start: 'top 75%',
            once: true
          }
        }
      );

      // Staggered animation for skill cards
      skillCardsRef.current.forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            delay: 0.1 + (index * 0.05),
            ease: 'power2.out',
            scrollTrigger: {
              trigger: skillsBoxRef.current,
              start: 'top 75%',
              once: true
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Function to add skill cards to ref array
  const addToSkillCardsRef = (el) => {
    if (el && !skillCardsRef.current.includes(el)) {
      skillCardsRef.current.push(el);
    }
  };

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

        <div
          style={{
            display: 'grid',
            gap: '1.5rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            alignItems: 'start'
          }}
        >
          <div ref={contentRef} className="about-content" style={{ opacity: 0 }}>
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

          <div
            ref={skillsBoxRef}
            style={{
              background: 'var(--glass-bg)',
              padding: '1.25rem',
              borderRadius: '12px',
              border: '1px solid var(--glass-border)',
              opacity: 0,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
            }}
          >
            {Object.entries(skills).map(([category, items], categoryIndex) => (
              <div key={category} style={{ marginBottom: categoryIndex === Object.keys(skills).length - 1 ? 0 : '1.5rem' }}>
                <h3
                  style={{
                    color: 'var(--accent-color)',
                    marginBottom: '0.75rem',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  {category === 'Full Stack' && '💻'}
                  {category === 'AI & ML' && '🧠'}
                  {category === 'Other Skills' && '🛠️'}
                  {category}
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                  gap: '0.6rem'
                }}>
                  {items.map((skill, index) => (
                    <div key={skill.name} ref={addToSkillCardsRef}>
                      <SkillCard skill={skill} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}