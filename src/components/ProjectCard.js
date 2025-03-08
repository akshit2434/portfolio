'use client';

import { useState } from 'react';

export default function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  const handleInteraction = () => {
    if (isMobile) {
      window.dispatchEvent(new CustomEvent('projectTap', { detail: { project } }));
    } else {
      setIsHovered(true);
      window.dispatchEvent(new CustomEvent('projectHover', { detail: { project } }));
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false);
      window.dispatchEvent(new CustomEvent('projectHover', { detail: { project: null } }));
    }
  };

  return (
    <div
      className={`project-card ${isHovered ? 'hovered' : ''}`}
      onClick={handleInteraction}
      onMouseEnter={handleInteraction}
      onMouseLeave={handleMouseLeave}
      style={{
        background: 'var(--glass-bg)',
        borderRadius: '15px',
        padding: '1.5rem',
        border: '1px solid var(--glass-border)',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div className="card-content"
        style={{
          position: 'relative',
          zIndex: 1
        }}
      >
        <h3 style={{
          marginBottom: '1rem',
          color: 'var(--accent-color)',
          fontSize: '1.5rem',
          transition: 'transform 0.3s ease'
        }}>
          {project.title}
        </h3>
        
        <p style={{
          opacity: 0.8,
          marginBottom: '1.5rem',
          lineHeight: '1.6',
          transition: 'opacity 0.3s ease'
        }}>
          {project.description}
        </p>

        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginTop: 'auto'
        }}>
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              style={{
                padding: '0.25rem 0.75rem',
                background: 'var(--glass-bg)',
                borderRadius: '15px',
                fontSize: '0.9rem',
                border: '1px solid var(--glass-border)',
                transition: 'all 0.3s ease'
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div style={{
          marginTop: '1.5rem',
          display: 'flex',
          gap: '1rem',
          opacity: isHovered ? 1 : 0,
          transform: `translateY(${isHovered ? '0' : '10px'})`,
          transition: 'all 0.3s ease'
        }}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                background: 'var(--accent-color)',
                color: 'var(--bg-color)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'all 0.3s ease'
              }}
            >
              View Live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                border: '1px solid var(--accent-color)',
                color: 'var(--accent-color)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'all 0.3s ease'
              }}
            >
              View Code
            </a>
          )}
        </div>
      </div>

      <div
        className="card-background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'var(--glass-bg)',
          opacity: isHovered ? 0.1 : 0,
          transform: `scale(${isHovered ? 1.5 : 1})`,
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          borderRadius: '15px',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}