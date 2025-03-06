'use client';

import { useEffect, useRef } from 'react';

const Particles = () => {
  const canvasRef = useRef(null);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particleLayers = [[], [], []];

    const resizeCanvas = () => {
      const scale = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * scale;
      canvas.height = window.innerHeight * scale;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(scale, scale);
    };

    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
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
      }

      reset(isInit = false) {
        // Distribute particles evenly across the screen
        this.baseX = Math.random() * window.innerWidth;
        this.baseY = Math.random() * window.innerHeight;
        this.x = this.baseX;
        this.y = this.baseY;
        this.size = Math.random() * (3 - this.layer * 0.5) + 1;
        this.shape = Math.random() > 0.7 ? 'circle' : 'square';
        this.parallaxFactor = 0.1 + (this.layer * 0.2);
      }

      update(scrollDelta) {
        // Apply scroll effect
        this.baseY += scrollDelta * this.parallaxFactor;
        
        // Wrap around on scroll
        if (this.baseY < -50) this.baseY = window.innerHeight + 50;
        if (this.baseY > window.innerHeight + 50) this.baseY = -50;

        // Apply perspective effect in hero section
        const isInHeroSection = scrollRef.current < window.innerHeight;
        if (isInHeroSection) {
          const perspectiveX = mouseRef.current.x * this.perspective;
          const perspectiveY = mouseRef.current.y * this.perspective;
          this.x = this.baseX + perspectiveX;
          this.y = this.baseY + perspectiveY;
        } else {
          this.x = this.baseX;
          this.y = this.baseY;
        }

        // Layer-based opacity animation for background particles
        if (this.layer > 0) {
          this.opacity = this.baseOpacity + (Math.sin(Date.now() * 0.001) * 0.1);
        }
      }

      draw() {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        
        if (this.shape === 'circle') {
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        } else {
          ctx.rect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
        }
        
        ctx.fill();
      }
    }

    const init = () => {
      particleLayers = [[], [], []];
      const baseParticles = Math.floor((window.innerWidth * window.innerHeight) / 10000);
      
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

    resizeCanvas();
    init();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      init();
    });

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particles-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default Particles;