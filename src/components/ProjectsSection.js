'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

const INITIAL_PROJECTS_COUNT = 3;

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);
  const githubRef = useRef(null);
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_PROJECTS_COUNT);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in and slide up title
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );

      // Fade in GitHub link
      gsap.fromTo(githubRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: githubRef.current,
            start: 'top 85%',
            once: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate project cards whenever visibleProjects changes
  useEffect(() => {
    const cards = cardsRef.current.children;
    
    gsap.fromTo(cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
      }
    );
  }, [visibleProjects]);

  // Initialize and animate the show more/less button
  useEffect(() => {
    const buttonContainer = document.querySelector('.show-more-container');
    if (buttonContainer) {
      gsap.fromTo(buttonContainer,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        }
      );
    }
  }, []);

  return (
    <section id="work" className="section" ref={sectionRef}>
      <div className="section-content">
        <h2
          ref={titleRef}
          className="section-title"
          style={{
            marginBottom: '3rem',
            color: 'var(--text-color)',
            fontSize: '2rem',
            fontWeight: 600,
            textAlign: 'center',
            opacity: 0
          }}
        >
          Featured Projects
        </h2>

        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            perspective: '1000px'
          }}
        >
          {visibleProjects.map((project) => (
            <div
              key={project.id}
              style={{ opacity: 0 }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <div
          className="show-more-container"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginTop: '3rem',
            opacity: 0,
            willChange: 'opacity, transform'
          }}
        >
          {projects.length > INITIAL_PROJECTS_COUNT && (
            <button
              onClick={() => setShowAll(!showAll)}
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                color: 'var(--text-color)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1rem',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                WebkitTapHighlightColor: 'transparent',
                WebkitTouchCallout: 'none',
                userSelect: 'none',
                outline: 'none'
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
              {showAll ? 'Show Less' : 'Show More'}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: showAll ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.3s ease'
                }}
              >
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
          )}
        </div>

        <div
          ref={githubRef}
          style={{
            marginTop: '3rem',
            textAlign: 'center',
            opacity: 0
          }}
        >
          <a
            href="https://github.com/akshit2434"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: '8px',
              color: 'var(--text-color)',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: 500,
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
            View More on GitHub
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}