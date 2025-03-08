'use client';
import { useLoading } from '../context/LoadingContext';

export function Content({ children }) {
  const { loadingComplete } = useLoading();
  
  return (
    <div className={loadingComplete ? 'loading-complete' : 'loading'}>
      {children}
    </div>
  );
}