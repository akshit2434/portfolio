'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
            once: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="section" ref={sectionRef}>
      <div className="section-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
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
          Let&apos;s Connect
        </h2>

        <div
          ref={contentRef}
          style={{
            textAlign: 'center',
            opacity: 0
          }}
        >
          <div style={{ marginBottom: '2rem' }}>
            <p style={{
              fontSize: '1.2rem',
              lineHeight: 1.6,
              marginBottom: '2rem',
              color: 'var(--text-color)',
              opacity: 0.9
            }}>
              Feel free to reach out for collaborations or just a friendly chat.
            </p>
            <p style={{
              color: 'var(--text-color)',
              fontSize: '1.1rem',
              marginBottom: '0.5rem'
            }}>
              <a href="mailto:akshit2434@gmail.com" className="link-highlight cursor-hover" style={{ color: 'var(--accent-color)', textDecoration: 'none' }}>akshit2434@gmail.com</a>
            </p>
            <p style={{
              color: 'var(--text-color)',
              fontSize: '1.1rem',
              opacity: 0.8
            }}>
              Ghaziabad, India
            </p>
          </div>

          <div className="social-links" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a
              href="https://github.com/akshit2434"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link cursor-hover"
              style={{
                padding: '0.75rem 1.5rem',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: '8px',
                color: 'var(--text-color)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease'
              }}
            >
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
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/akshit-singh-a137641a7/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link cursor-hover"
              style={{
                padding: '0.75rem 1.5rem',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: '8px',
                color: 'var(--text-color)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease'
              }}
            >
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
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              LinkedIn
            </a>
            <a
              href="https://x.com/aks_2434"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link cursor-hover"
              style={{
                padding: '0.75rem 1.5rem',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: '8px',
                color: 'var(--text-color)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease'
              }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20"
                height="20"
                viewBox="0 0 1200 1227"
                fill="currentColor"
              >
                <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="currentColor"/>
              </svg>
              Twitter
            </a>
            <a
              href="https://www.instagram.com/thesc1enceguy/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link cursor-hover"
              style={{
                padding: '0.75rem 1.5rem',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: '8px',
                color: 'var(--text-color)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease'
              }}
            >
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
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              Instagram
            </a>
            <a
              href="https://t.me/thesc1enceguy"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link cursor-hover"
              style={{
                padding: '0.75rem 1.5rem',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: '8px',
                color: 'var(--text-color)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease'
              }}
            >
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
                <path d="M22 2L11 13"></path>
                <path d="M22 2L15 22L11 13L2 9L22 2z"></path>
              </svg>
              Telegram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}