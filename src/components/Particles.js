'use client';

import { useEffect, useRef } from 'react';

const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return ('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0);
};

const Particles = () => {
  const canvasRef = useRef(null);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);
  const isTouchRef = useRef(false);

  useEffect(() => {
    // Check for touch device after mount
    isTouchRef.current = ('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particleLayers = [[], [], []];

    const resizeCanvas = () => {
      const viewportWidth = document.documentElement.clientWidth;
      const viewportHeight = document.documentElement.clientHeight;
      const scale = window.devicePixelRatio || 1;
      
      console.log('[Particles] Resize:', {
        viewportWidth,
        viewportHeight,
        devicePixelRatio: scale,
        canvasWidth: viewportWidth * scale,
        canvasHeight: viewportHeight * scale
      });
      
      canvas.width = viewportWidth * scale;
      canvas.height = viewportHeight * scale;
      canvas.style.width = viewportWidth + 'px';
      canvas.style.height = viewportHeight + 'px';
      
      // Reset scale transform
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      // Apply new scale
      ctx.scale(scale, scale);
      
      console.log('[Particles] Canvas style:', {
        width: canvas.style.width,
        height: canvas.style.height,
        actualWidth: canvas.width,
        actualHeight: canvas.height
      });
    };

    const handleMouseMove = (e) => {
      if (isTouchRef.current) return;  // Skip mouse tracking on touch devices
      
      const viewportWidth = document.documentElement.clientWidth;
      const viewportHeight = document.documentElement.clientHeight;
      mouseRef.current = {
        x: e.clientX / viewportWidth - 0.5,
        y: e.clientY / viewportHeight - 0.5
      };
    };

    class Particle {
      constructor(layer) {
        this.layer = layer;
        const isMobile = isTouchDevice();
        this.reset(true);
        
        // Increased base opacity for mobile
        const opacityMultiplier = isMobile ? 1.5 : 1;
        this.baseOpacity = (this.layer === 0 ? 0.5 :
                          this.layer === 1 ? 0.3 : 0.15) * opacityMultiplier;
        this.opacity = this.baseOpacity;
        this.perspective = (3 - this.layer) * 15;
        this.color = this.generateColor();
        
        // Slower animation on mobile for better performance
        this.speed = (Math.random() * 0.2 + 0.1) * (isMobile ? 0.7 : 1);
      }

      generateColor() {
        const hue = Math.random() * 60 + 190; // Blue to purple range
        const saturation = 30 + Math.random() * 20; // Subtle saturation
        const lightness = 70 + Math.random() * 20; // Bright
        return `hsla(${hue}, ${saturation}%, ${lightness}%, 1)`;
      }

      reset(isInit = false) {
        const viewportWidth = document.documentElement.clientWidth;
        const viewportHeight = document.documentElement.clientHeight;
        const scale = window.devicePixelRatio || 1;
        const isMobile = isTouchDevice();
        
        // Initialize base positions in logical pixels
        this.baseX = Math.random() * viewportWidth;
        this.baseY = Math.random() * viewportHeight;
        
        // Set initial positions (will be scaled in update)
        this.x = this.baseX * scale;
        this.y = this.baseY * scale;
        
        // Adjust size based on device type and pixel ratio
        const baseSize = Math.random() * (3 - this.layer * 0.5) + 1;
        const sizeMultiplier = isMobile ? 0.25 : 1; // 4 times smaller on mobile
        this.size = baseSize * scale * sizeMultiplier;
        
        this.shape = Math.random() > 0.7 ? 'circle' : 'square';
        this.parallaxFactor = 0.1 + (this.layer * 0.3);
        this.angle = Math.random() * Math.PI * 2;
        
        // Scale amplitude based on device pixel ratio
        this.amplitude = (Math.random() * 1.5 + 0.5) * scale;
        
        // Store viewport dimensions for boundary checks
        this.viewportWidth = viewportWidth;
        this.viewportHeight = viewportHeight;
      }

      update(scrollDelta) {
        const viewportWidth = document.documentElement.clientWidth;
        const viewportHeight = document.documentElement.clientHeight;
        const scale = window.devicePixelRatio || 1;

        // Update viewport dimensions if changed
        if (this.viewportWidth !== viewportWidth || this.viewportHeight !== viewportHeight) {
          this.reset();
          return;
        }

        // Update scale based on scroll
        const targetScale = 1 + (scrollRef.current / viewportHeight) * 0.5;
        scaleRef.current += (targetScale - scaleRef.current) * 0.1;

        // Calculate center point for scaling (in device pixels)
        const centerX = (viewportWidth * scale) / 2;
        const centerY = (viewportHeight * scale) / 2;

        // Apply scroll effect with smooth floating motion
        this.angle += this.speed * 0.02;
        
        // Add floating motion (scaled by device pixel ratio)
        const floatX = Math.sin(this.angle) * this.amplitude * scale;
        const floatY = Math.cos(this.angle * 0.8) * this.amplitude * scale;

        // Calculate scaled position from center (in device pixels)
        const dx = (this.baseX * scale) - centerX;
        const dy = (this.baseY * scale) - centerY;
        const scaledX = centerX + dx * scaleRef.current;
        const scaledY = centerY + dy * scaleRef.current;

        // Apply cursor parallax effect only on non-touch devices
        let mouseParallaxX = 0;
        let mouseParallaxY = 0;
        if (!isTouchRef.current) {
          mouseParallaxX = mouseRef.current.x * 50 * (this.layer + 1) * scale;
          mouseParallaxY = mouseRef.current.y * 50 * (this.layer + 1) * scale;
        }

        // Update position with scaling, floating and mouse parallax
        this.x = scaledX + floatX * scaleRef.current + mouseParallaxX;
        this.y = scaledY + floatY * scaleRef.current + mouseParallaxY;

        // Update size based on scale
        this.currentSize = this.size * (1 + (scaleRef.current - 1) * 0.5);

        // Smooth opacity animation with scale fade
        const time = Date.now() * 0.001;
        const opacityWave = Math.sin(time + this.angle) * 0.1;
        const scaleFade = Math.max(0, 1 - (scaleRef.current - 1) * 0.5);
        this.opacity = (this.baseOpacity + (this.layer > 0 ? opacityWave : 0)) * scaleFade;
      }

      draw() {
        const scale = window.devicePixelRatio || 1;
        ctx.beginPath();
        ctx.globalCompositeOperation = 'lighter';
        
        // Scale size by device pixel ratio
        const adjustedSize = (this.currentSize || this.size) * scale;
        
        // Create gradient for each particle
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, adjustedSize * 2
        );
        gradient.addColorStop(0, this.color.replace('1)', `${this.opacity})`));
        gradient.addColorStop(1, this.color.replace('1)', '0)'));
        ctx.fillStyle = gradient;

        if (this.shape === 'circle') {
          ctx.arc(this.x, this.y, adjustedSize, 0, Math.PI * 2);
        } else {
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(this.angle);
          ctx.rect(-adjustedSize/2, -adjustedSize/2, adjustedSize, adjustedSize);
          ctx.restore();
        }
        
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
      }
    }

    const init = () => {
      particleLayers = [[], [], []];
      const viewportWidth = document.documentElement.clientWidth;
      const viewportHeight = document.documentElement.clientHeight;
      
      // Calculate base particle count based on viewport area
      const scale = window.devicePixelRatio || 1;
      const viewportArea = viewportWidth * viewportHeight;
      // Adjust density based on device type
      const densityFactor = isTouchDevice() ? 8000 : 12000;
      const baseParticles = Math.floor(Math.min(
        Math.max(viewportArea / densityFactor, 40),
        isTouchDevice() ? 120 : 200
      ));

      console.log('[Particles] Initialization:', {
        viewportWidth,
        viewportHeight,
        scale,
        viewportArea,
        baseParticles,
        canvasContext: ctx ? 'available' : 'null'
      });
      
      // Clear existing particles
      particleLayers.forEach(layer => layer.length = 0);
      
      // Initialize new particles for each layer
      particleLayers.forEach((layer, i) => {
        const layerParticles = Math.floor(baseParticles * (1 - i * 0.2));
        for (let j = 0; j < layerParticles; j++) {
          layer.push(new Particle(i));
        }
        console.log(`[Particles] Layer ${i} initialized with ${layerParticles} particles`);
      });
    };

    const animate = () => {
      if (!ctx) {
        console.error('[Particles] Canvas context lost');
        return;
      }

      try {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const currentScroll = window.scrollY;
        const scrollDelta = currentScroll - scrollRef.current;
        scrollRef.current = currentScroll;

        // Log first animation frame details
        if (!window._hasLoggedFirstFrame) {
          console.log('[Particles] First animation frame:', {
            canvasWidth: canvas.width,
            canvasHeight: canvas.height,
            particleLayers: particleLayers.map(layer => layer.length),
            devicePixelRatio: window.devicePixelRatio || 1
          });
          window._hasLoggedFirstFrame = true;
        }

        particleLayers.forEach(layer => {
          layer.forEach(particle => {
            particle.update(scrollDelta);
            particle.draw();
          });
        });

        animationFrameId = requestAnimationFrame(animate);
      } catch (error) {
        console.error('[Particles] Animation error:', error);
      }
    };

    // Debounced resize handler
    let resizeTimeout;
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
        init();
      }, 250);
    };

    resizeCanvas();
    init();
    animate();

    // Use the debounced handler for resize events
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particles-canvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: isTouchRef.current ? 5 : 1, // Lower z-index on mobile
        pointerEvents: 'none',
        objectFit: 'cover',
        willChange: 'transform'
      }}
    />
  );
};

export default Particles;