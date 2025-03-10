'use client';

import { useEffect, useState, useRef } from 'react';

// Class name for elements that should trigger cursor size change
const INTERACTIVE_CLASS = 'cursor-hover';

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
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleInteractiveEnter = () => setIsPointer(true);
    const handleInteractiveLeave = () => setIsPointer(false);

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
        }, 500);
      }
    };

    const handleMouseLeave = () => {
      setClicked(false);
      setIsPointer(false);
      setMoving(false);
      setHidden(false);
    };

    // Add mouseenter/mouseleave listeners to all interactive elements
    const addInteractiveListeners = () => {
      const elements = document.getElementsByClassName(INTERACTIVE_CLASS);
      Array.from(elements).forEach(element => {
        element.addEventListener('mouseenter', handleInteractiveEnter);
        element.addEventListener('mouseleave', handleInteractiveLeave);
      });
    };

    // Initial setup
    addInteractiveListeners();

    // Setup mutation observer to handle dynamically added elements
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
          addInteractiveListeners();
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    frameRef.current = requestAnimationFrame(animate);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('projectHover', handleProjectHover);
    window.addEventListener('hide-cursor', handleHideCursor);
    window.addEventListener('show-cursor', handleShowCursor);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(frameRef.current);
      observer.disconnect();
      
      // Remove listeners from all interactive elements
      const elements = document.getElementsByClassName(INTERACTIVE_CLASS);
      Array.from(elements).forEach(element => {
        element.removeEventListener('mouseenter', handleInteractiveEnter);
        element.removeEventListener('mouseleave', handleInteractiveLeave);
      });

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