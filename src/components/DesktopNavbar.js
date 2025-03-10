'use client';

import { useTheme } from '../context/ThemeContext';

const DesktopNavbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="navbar desktop-navbar">
      <div className="logo" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          position: 'relative',
          zIndex: 1,
          padding: '0.5rem 1rem',
          borderRadius: '10px',
          background: 'linear-gradient(120deg, var(--glass-bg), rgba(255, 255, 255, 0.03))',
          border: '1px solid var(--glass-border)',
        }}>
          <span style={{
            fontWeight: '600',
            fontSize: '1.2rem',
            background: 'linear-gradient(45deg, var(--accent-color), rgba(220, 241, 245, 0.8))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            position: 'relative'
          }}>
            Akshit2434
          </span>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '-5px',
            width: '3px',
            height: '10px',
            background: 'var(--accent-color)',
            transform: 'translateY(-50%)',
            borderRadius: '2px',
            opacity: 0.8
          }} />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <ul className="nav-links">
          {['home', 'about', 'work', 'contact'].map((section) => (
            <li key={section}>
              <a
                href={`#${section}`}
                className="cursor-hover"
                style={{ textTransform: 'capitalize' }}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector(e.target.getAttribute('href'));
                  if (target) {
                    const offset = target.offsetTop - 100; // Add offset for navbar height
                    window.scrollTo({
                      top: offset,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                {section}
              </a>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          className="cursor-hover"
          style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            padding: '0.5rem',
            cursor: 'pointer',
            color: 'var(--text-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '10px',
            transition: 'all 0.3s ease',
            opacity: 0.8,
            boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.05)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.8';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {theme === 'dark' ? (
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
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
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
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
};

export default DesktopNavbar;