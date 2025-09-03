'use client';

import { useEffect, useState } from 'react';

export default function AboutBlur() {
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;
        setIsBlurred(isInView);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const backgroundLayer = document.getElementById('background-layer');
    const liquidBlobLayer = document.getElementById('liquid-blob-layer');
    
    if (backgroundLayer) {
      backgroundLayer.style.filter = isBlurred ? 'blur(12px)' : 'blur(0px)';
      backgroundLayer.style.transition = 'filter 0.8s ease-out';
    }
    
    if (liquidBlobLayer) {
      liquidBlobLayer.style.filter = isBlurred ? 'blur(12px)' : 'blur(0px)';
      liquidBlobLayer.style.transition = 'filter 0.8s ease-out';
    }
  }, [isBlurred]);

  return null;
}