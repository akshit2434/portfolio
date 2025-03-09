'use client';

import { useEffect, useState, useRef } from 'react';

const Cursor = () => {
  const [clicked, setClicked] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [moving, setMoving] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [lastImage, setLastImage] = useState('');
  const [hidden, setHidden] = useState(false);
  const cursorRef = useRef(null);
  const previewRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef();
  const fadeTimeoutRef = useRef();

  useEffect(() => {
    let moveTimeout;
    let lastTarget = null;

    const lerp = (start, end, factor) => start + (end - start) * factor;
    
    const animate = () => {
      const easeFactor = clicked ? 0.25 : 0.15;
      
      positionRef.current.x = lerp(positionRef.current.x, targetRef.current.x, easeFactor);
      positionRef.current.y = lerp(positionRef.current.y, targetRef.current.y, easeFactor);

      const transform = `translate(calc(${positionRef.current.x}px - 50%), calc(${positionRef.current.y}px - 50%))`;
      if (cursorRef.current) {
        cursorRef.current.style.transform = transform;
      }

      if (previewRef.current) {
        previewRef.current.style.transform = `translate(${positionRef.current.x + 20}px, ${positionRef.current.y + 20}px)`;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setMoving(true);
      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => setMoving(false), 100);

      const isTargetPointer = window.getComputedStyle(e.target).cursor === 'pointer';
      if (isTargetPointer !== isPointer) {
        setIsPointer(isTargetPointer);
      }
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleHideCursor = () => setHidden(true);
    const handleShowCursor = () => setHidden(false);

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

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('projectHover', handleProjectHover);
    window.addEventListener('hide-cursor', handleHideCursor);
    window.addEventListener('show-cursor', handleShowCursor);

    const handleMouseLeave = () => {
      setClicked(false);
      setIsPointer(false);
      setMoving(false);
      setHidden(false);
    };
    
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('projectHover', handleProjectHover);
      window.removeEventListener('hide-cursor', handleHideCursor);
      window.removeEventListener('show-cursor', handleShowCursor);
      window.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(moveTimeout);
      clearTimeout(fadeTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${clicked ? 'clicked' : ''} ${
          isPointer ? 'pointer' : ''
        } ${moving ? 'moving' : ''} ${hoveredProject ? 'project-hover' : ''} ${
          hidden ? 'hidden' : ''
        }`}
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