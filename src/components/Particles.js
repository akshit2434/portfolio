'use client';

import { useEffect, useRef } from 'react';

const Particles = () => {
  const canvasRef = useRef(null);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particleLayers = [[], [], []];

    const resizeCanvas = () => {
      const viewportWidth = document.documentElement.clientWidth;
      const viewportHeight = document.documentElement.clientHeight;
      const scale = window.devicePixelRatio || 1;
      
      canvas.width = viewportWidth * scale;
      canvas.height = viewportHeight * scale;
      canvas.style.width = viewportWidth + 'px';
      canvas.style.height = viewportHeight + 'px';
      
      // Reset scale transform
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      // Apply new scale
      ctx.scale(scale, scale);
    };

    const handleMouseMove = (e) => {
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
        this.reset(true);
        this.baseOpacity = this.layer === 0 ? 0.5 :
                          this.layer === 1 ? 0.3 : 0.15;
        this.opacity = this.baseOpacity;
        this.perspective = (3 - this.layer) * 15;
        this.color = this.generateColor();
        this.speed = Math.random() * 0.2 + 0.1;
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
        
        this.baseX = Math.random() * viewportWidth;
        this.baseY = Math.random() * viewportHeight;
        this.x = this.baseX;
        this.y = this.baseY;
        this.size = Math.random() * (3 - this.layer * 0.5) + 1;
        this.shape = Math.random() > 0.7 ? 'circle' : 'square';
        this.parallaxFactor = 0.1 + (this.layer * 0.3);
        this.angle = Math.random() * Math.PI * 2;
        this.amplitude = Math.random() * 1.5 + 0.5;
        
        // Store viewport dimensions for boundary checks
        this.viewportWidth = viewportWidth;
        this.viewportHeight = viewportHeight;
      }

      update(scrollDelta) {
        const viewportWidth = document.documentElement.clientWidth;
        const viewportHeight = document.documentElement.clientHeight;

        // Update viewport dimensions if changed
        if (this.viewportWidth !== viewportWidth || this.viewportHeight !== viewportHeight) {
          this.reset();
          return;
        }

        // Update scale based on scroll
        const targetScale = 1 + (scrollRef.current / viewportHeight) * 0.5;
        scaleRef.current += (targetScale - scaleRef.current) * 0.1;

        // Calculate center point for scaling
        const centerX = viewportWidth / 2;
        const centerY = viewportHeight / 2;

        // Apply scroll effect with smooth floating motion
        this.angle += this.speed * 0.02;
        
        // Add floating motion
        const floatX = Math.sin(this.angle) * this.amplitude;
        const floatY = Math.cos(this.angle * 0.8) * this.amplitude;

        // Calculate scaled position from center
        const dx = this.baseX - centerX;
        const dy = this.baseY - centerY;
        const scaledX = centerX + dx * scaleRef.current;
        const scaledY = centerY + dy * scaleRef.current;

        // Apply cursor parallax effect
        const mouseParallaxX = mouseRef.current.x * 50 * (this.layer + 1);
        const mouseParallaxY = mouseRef.current.y * 50 * (this.layer + 1);

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
        
        // Create gradient for each particle
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 2
        );
        gradient.addColorStop(0, this.color.replace('1)', `${this.opacity})`));
        gradient.addColorStop(1, this.color.replace('1)', '0)'));
        ctx.fillStyle = gradient;
        
        const scaledX = this.x / scale;
        const scaledY = this.y / scale;

        if (this.shape === 'circle') {
          ctx.arc(scaledX, scaledY, this.currentSize || this.size, 0, Math.PI * 2);
        } else {
          ctx.save();
          ctx.translate(scaledX, scaledY);
          ctx.rotate(this.angle);
          const size = this.currentSize || this.size;
          ctx.rect(-size/2, -size/2, size, size);
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
      
      // Calculate base particle count based on viewport area and pixel ratio
      const scale = window.devicePixelRatio || 1;
      const viewportArea = viewportWidth * viewportHeight;
      const baseParticles = Math.floor(Math.min(
        Math.max(viewportArea / (12000 / scale), 20),
        200
      ));
      
      // Clear existing particles
      particleLayers.forEach(layer => layer.length = 0);
      
      // Initialize new particles for each layer
      particleLayers.forEach((layer, i) => {
        const layerParticles = Math.floor(baseParticles * (1 - i * 0.2));
        for (let j = 0; j < layerParticles; j++) {
          layer.push(new Particle(i));
        }
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const currentScroll = window.scrollY;
      const scrollDelta = currentScroll - scrollRef.current;
      scrollRef.current = currentScroll;

      particleLayers.forEach(layer => {
        layer.forEach(particle => {
          particle.update(scrollDelta);
          particle.draw();
        });
      });

      animationFrameId = requestAnimationFrame(animate);
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
        zIndex: 1,
        pointerEvents: 'none',
        objectFit: 'cover',
        willChange: 'transform'
      }}
    />
  );
};

export default Particles;