'use client';
import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const LoadingContext = createContext({
  isLoading: true,
  setIsLoading: () => {},
  progress: 0,
  setProgress: () => {},
  startLoading: () => {},
});

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const startTimeRef = useRef(null);
  const loadDurationRef = useRef(0);
  const rafRef = useRef(null);

  const startLoading = useCallback(() => {
    startTimeRef.current = performance.now();
    const initialLoad = () => {
      setProgress(prev => {
        if (prev >= 95) return prev;
        const increment = Math.random() * 3 + 2; // 2-5% increment
        const next = Math.min(95, prev + increment);
        return next;
      });
      
      rafRef.current = requestAnimationFrame(initialLoad);
    };
    requestAnimationFrame(initialLoad);
  }, []);

  useEffect(() => {
    if (progress >= 95 && !loadingComplete) {
      const finishTimer = setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          setLoadingComplete(true);
        }, 400);
      }, 500);
      return () => clearTimeout(finishTimer);
    }
  }, [progress, loadingComplete]);

  useEffect(() => {
    startLoading();
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [startLoading]);

  useEffect(() => {
    document.documentElement.style.setProperty('--enable-animations', loadingComplete ? '1' : '0');
  }, [loadingComplete]);

  return (
    <LoadingContext.Provider 
      value={{ 
        isLoading, 
        setIsLoading, 
        progress, 
        setProgress, 
        loadingComplete,
        startLoading
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);