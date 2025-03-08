'use client';

import { useEffect, useState, useRef } from 'react';

const Cursor = () => {
  const [clicked, setClicked] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [moving, setMoving] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [lastImage, setLastImage] = useState('');
  const cursorRef = useRef(null);
  const previewRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef();
  const fadeTimeoutRef = useRef();

  useEffect(() => {
    let moveTimeout;

    const lerp = (start, end, factor) => start + (end - start) * factor;
    
    const animate = () => {
      const easeFactor = 0.15;
      
      positionRef.current.x = lerp(positionRef.current.x, targetRef.current.x, easeFactor);
      positionRef.current.y = lerp(positionRef.current.y, targetRef.current.y, easeFactor);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(calc(${positionRef.current.x}px - 50%), calc(${positionRef.current.y}px - 50%))`;
      }

      if (previewRef.current) {
        previewRef.current.style.transform = `translate(${positionRef.current.x + 20}px, ${positionRef.current.y + 20}px)`;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    const updateCursor = (e) => {
      const target = e.target;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
      targetRef.current = { x: e.clientX, y: e.clientY };
      setMoving(true);
      
      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => setMoving(false), 100);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => {
      setClicked(false);
      setMoving(true);
      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => setMoving(false), 100);
    };

    const handleProjectHover = (e) => {
      if (e.detail?.project) {
        setHoveredProject(e.detail.project);
        setLastImage(e.detail.project.image);
      } else {
        setHoveredProject(null);
        clearTimeout(fadeTimeoutRef.current);
        fadeTimeoutRef.current = setTimeout(() => {
          setLastImage('');
        }, 500); // Match fade-out duration
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('projectHover', handleProjectHover);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('projectHover', handleProjectHover);
      clearTimeout(moveTimeout);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${clicked ? 'clicked' : ''} ${
          isPointer ? 'pointer' : ''
        } ${moving ? 'moving' : ''} ${hoveredProject ? 'project-hover' : ''}`}
      />
      <div
        ref={previewRef}
        className={`project-preview ${hoveredProject ? 'visible' : ''}`}
        style={{
          transform: `translate(${positionRef.current.x + 20}px, ${positionRef.current.y + 20}px)`
        }}
      >
        <img
          src={hoveredProject?.image || lastImage || '/no_preview.png'}
          alt={hoveredProject ? hoveredProject?.title : 'No preview available'}
          style={{
            width: '200px',
            height: '120px',
            objectFit: 'cover',
            borderRadius: '8px',
            opacity: hoveredProject ? 1 : 0,
            transition: 'opacity 0.2s ease-out'
          }}
        />
      </div>
    </>
  );
};

export default Cursor;