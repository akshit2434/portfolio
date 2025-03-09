'use client';
import { useEffect, useState } from 'react';
import { useLoading } from '../context/LoadingContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader() {
  const { isLoading, progress, loadingComplete } = useLoading();
  const { theme } = useTheme();
  const [loaderTheme, setLoaderTheme] = useState('dark');

  // Switch to user's theme after initial animation
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        document.documentElement.setAttribute('data-theme', theme);
      }, 600);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, theme]);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isLoading]);

  return (
    <AnimatePresence mode="wait">
      {!loadingComplete && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.6,
              ease: [0.76, 0, 0.24, 1]
            }
          }}
        >
          <div className="loader-content">
            <motion.h1
              key={progress}
              className="loader-percentage"
            >
              {Math.round(progress)}
            </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}