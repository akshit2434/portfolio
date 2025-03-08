'use client';

import { useEffect, useState } from 'react';

export default function MobileProjectPreview() {
  const [activeProject, setActiveProject] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [nextProject, setNextProject] = useState(null);

  useEffect(() => {
    const handleProjectTap = (e) => {
      const newProject = e.detail.project;
      
      if (!newProject) {
        // Handle closing
        setIsVisible(false);
        setTimeout(() => setActiveProject(null), 300);
        return;
      }

      if (activeProject) {
        // If a project is already open, close it first
        setIsVisible(false);
        setTimeout(() => {
          setActiveProject(newProject);
          setTimeout(() => setIsVisible(true), 50);
        }, 300);
      } else {
        // First time opening
        setActiveProject(newProject);
        setTimeout(() => setIsVisible(true), 50);
      }
    };

    window.addEventListener('projectTap', handleProjectTap);
    return () => window.removeEventListener('projectTap', handleProjectTap);
  }, [activeProject]);

  if (!activeProject) return null;

  return (
    <div className={`mobile-project-preview ${isVisible ? 'visible' : ''}`}>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => setActiveProject(null), 300);
        }}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-color)',
          opacity: 0.6,
          cursor: 'pointer',
          padding: '0.5rem',
          position: 'absolute',
          right: '0.5rem',
          top: '0.5rem',
          zIndex: 2
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      
      {activeProject.image && (
        <div style={{
          width: '100%',
          height: '200px',
          marginBottom: '1rem',
          overflow: 'hidden',
          borderRadius: '12px',
          border: '1px solid var(--glass-border)'
        }}>
          <img
            src={activeProject.image}
            alt={activeProject.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
      )}
      
      <div style={{ padding: '0 1rem' }}>
        <h3 style={{
          fontSize: '1.2rem',
          marginBottom: '0.5rem',
          color: 'var(--accent-color)'
        }}>
          {activeProject.title}
        </h3>
        <p style={{
          fontSize: '0.9rem',
          opacity: 0.8,
          marginBottom: '1rem'
        }}>
          {activeProject.description}
        </p>
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap'
        }}>
          {activeProject.liveUrl && (
            <a
              href={activeProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                background: 'var(--accent-color)',
                color: 'var(--bg-color)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              View Live
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
          {activeProject.githubUrl && (
            <a
              href={activeProject.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                border: '1px solid var(--accent-color)',
                color: 'var(--accent-color)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              View Code
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}