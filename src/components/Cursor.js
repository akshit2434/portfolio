'use client';

import { useEffect, useState } from 'react';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [moving, setMoving] = useState(false);

  useEffect(() => {
    let moveTimeout;
    
    const updateCursor = (e) => {
      const target = e.target;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
      setPosition({ x: e.clientX, y: e.clientY });
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

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      clearTimeout(moveTimeout);
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${clicked ? 'clicked' : ''} ${
        isPointer ? 'pointer' : ''
      } ${moving ? 'moving' : ''}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
    />
  );
};

export default Cursor;