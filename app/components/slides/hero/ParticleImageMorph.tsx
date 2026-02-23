"use client";

import { useEffect, useRef, useState } from "react";

interface Point {
  x: number;
  y: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  color: string;
  targetColor: string;
  size: number;
  delay: number;
  speedFactor: number;
  phase: number;
}

interface ParticleImageMorphProps {
  blobSrc: string;
  carSrc: string;
  isCar: boolean;
  className?: string;
}

export function ParticleImageMorph({
  blobSrc,
  carSrc,
  isCar,
  className,
}: ParticleImageMorphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const blobPoints = useRef<Point[]>([]);
  const carPoints = useRef<Point[]>([]);
  const particles = useRef<Particle[]>([]);

  const animationFrameRef = useRef<number>(0);
  const timeRef = useRef(0);
  const morphStartTimeRef = useRef(0);
  const lastFrameTimeRef = useRef(0);

  // --- IMAGE PROCESSING ---
  useEffect(() => {
    let active = true;

    const processImage = (src: string, scale: number = 1): Promise<Point[]> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = src;
        img.onload = () => {
          if (!active) return;

          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d", { willReadFrequently: true });
          if (!ctx) return resolve([]);

          const w = 2400;
          const h = 2400;
          canvas.width = w;
          canvas.height = h;

          const aspect = img.width / img.height;
          let drawW = w * scale;
          let drawH = (w / aspect) * scale;

          if (drawH > h * scale) {
             drawH = h * scale;
             drawW = (h * aspect) * scale;
          }

          // Cap to canvas bounds so scale > 1 never clips
          if (drawW > w) { drawW = w; drawH = w / aspect; }
          if (drawH > h) { drawH = h; drawW = h * aspect; }

          const offsetX = (w - drawW) / 2;
          const offsetY = (h - drawH) / 2;

          ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

          const imageData = ctx.getImageData(0, 0, w, h);
          const data = imageData.data;
          const points: Point[] = [];

          const gap = 8;

          for (let y = 0; y < h; y += gap) {
            for (let x = 0; x < w; x += gap) {
              const i = (y * w + x) * 4;
              const a = data[i + 3];

              if (a > 20) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                points.push({
                  x,
                  y,
                  color: `rgba(${r},${g},${b},${a/255})`,
                });
              }
            }
          }
          resolve(points);
        };
      });
    };

    Promise.all([
        processImage(blobSrc, 0.44),
        processImage(carSrc, 1.5)
    ]).then(([bPoints, cPoints]) => {
      if (!active) return;
      blobPoints.current = bPoints;
      carPoints.current = cPoints;

      // Initialize particles (start as Blob)
      particles.current = bPoints.map(p => ({
        x: p.x,
        y: p.y,
        tx: p.x,
        ty: p.y,
        vx: 0,
        vy: 0,
        baseX: p.x,
        baseY: p.y,
        color: p.color,
        targetColor: p.color,
        size: Math.random() < 0.15 ? 3.5 : 2.5,
        delay: 0,
        speedFactor: 0.8 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
      }));

      setImagesLoaded(true);
    });

    return () => { active = false; };
  }, [blobSrc, carSrc]);

  // --- MORPH LOGIC ---
  useEffect(() => {
    if (!imagesLoaded) return;

    morphStartTimeRef.current = Date.now();
    const targetPoints = isCar ? carPoints.current : blobPoints.current;
    const currentParticles = particles.current;

    // 1. Expand pool if needed
    if (targetPoints.length > currentParticles.length) {
      const needed = targetPoints.length - currentParticles.length;
      for (let i = 0; i < needed; i++) {
        const cx = 1200;
        const cy = 1200;

        currentParticles.push({
          x: cx,
          y: cy,
          tx: cx,
          ty: cy,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          baseX: cx,
          baseY: cy,
          color: 'rgba(0,0,0,0)',
          targetColor: 'rgba(0,0,0,0)',
          size: Math.random() < 0.15 ? 3.5 : 2.5,
          delay: 0,
          speedFactor: 0.8 + Math.random() * 0.4,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    // 2. Assign Targets & Calculate Delays
    // Use shuffled indices for assignment to prevent strict line-mapping
    const indices = Array.from({ length: currentParticles.length }, (_, i) => i);
    // Simple shuffle to break line artifacts
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    for (let i = 0; i < currentParticles.length; i++) {
      const pIndex = indices[i];
      const p = currentParticles[pIndex];

      if (i < targetPoints.length) {
        const t = targetPoints[i];
        p.tx = t.x;
        p.ty = t.y;
        p.targetColor = t.color;
        p.baseX = t.x;
        p.baseY = t.y;

        // "Controlled Random" Top-to-Bottom Effect
        // Normalize Y coordinate (0 at top, 1 at bottom)
        const ny = t.y / 2400;

        // Add randomness so it's not a perfect scan line
        const randomOffset = Math.random() * 0.4; // 40% noise/randomness

        // Combine Y-position and randomness for the delay
        // Multiply by total duration (e.g., 800ms)
        // Top pixels (ny=0) start earlier, Bottom (ny=1) start later
        p.delay = (ny + randomOffset) * 600;

      } else {
        // Retire extra particles to center
        p.tx = 1200;
        p.ty = 1200;
        p.targetColor = 'rgba(0,0,0,0)';
        p.delay = 0;
      }
    }
  }, [isCar, imagesLoaded]);


  // --- PHYSICS ENGINE ---
  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Physics Tuning: "No Bounce" / High Damping
    const SPRING_STIFFNESS = 0.08; // Higher stiffness = faster snap
    const DAMPING = 0.65;          // Heavy damping = no bounce, slides to stop

    const render = (timestamp: number) => {
      if (timestamp - lastFrameTimeRef.current < 33) {
        animationFrameRef.current = requestAnimationFrame(render);
        return;
      }
      lastFrameTimeRef.current = timestamp;

      timeRef.current += 0.015;
      const now = Date.now();
      const timeSinceMorph = now - morphStartTimeRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const numParticles = particles.current.length;

      for (let i = 0; i < numParticles; i++) {
        const p = particles.current[i];

        if (p.targetColor === 'rgba(0,0,0,0)' && Math.abs(p.x - p.tx) < 1) continue;

        // 1. Check Delay
        const isWaiting = timeSinceMorph < p.delay;

        // 2. Attractor Point
        let targetX = p.tx;
        let targetY = p.ty;

        // 3. Alive Noise
        let noiseX = 0;
        let noiseY = 0;

        if (isCar && !isWaiting) {
           // Car: Tiny vibration
           noiseX = (Math.random() - 0.5) * 0.5;
           noiseY = (Math.random() - 0.5) * 0.5;
        } else {
           // Blob: Organic idle — four independent wave layers
           const t = timeRef.current;
           const ph = p.phase;

           // Wave 1: Large, slow swell — global breathing motion
           // Per-particle phase breaks lockstep so rows don't move as one
           const wave1X = Math.sin(p.baseY * 0.004 + t * 0.4 + ph) * 9.0;
           const wave1Y = Math.cos(p.baseX * 0.004 + t * 0.35 + ph) * 9.0;

           // Wave 2: Medium ripple at a crossed frequency
           const wave2X = Math.sin(p.baseX * 0.012 + t * 1.2 + ph * 1.3) * 5.0;
           const wave2Y = Math.cos(p.baseY * 0.012 + t * 1.1 + ph * 1.3) * 5.0;

           // Wave 3: Fast diagonal shimmer — surface chatter
           const wave3X = Math.sin(p.baseX * 0.035 + p.baseY * 0.02 + t * 3.5 + ph * 0.7) * 2.0;
           const wave3Y = Math.cos(p.baseY * 0.035 + p.baseX * 0.02 + t * 3.2 + ph * 0.7) * 2.0;

           // Wave 4: Very slow per-particle wander — each particle drifts on its own path
           const wave4X = Math.sin(t * 0.15 + ph * 2.1) * 4.0;
           const wave4Y = Math.cos(t * 0.18 + ph * 1.7) * 4.0;

           noiseX = wave1X + wave2X + wave3X + wave4X;
           noiseY = wave1Y + wave2Y + wave3Y + wave4Y;
        }

        const effectiveTargetX = targetX + noiseX;
        const effectiveTargetY = targetY + noiseY;

        // 4. Force
        const dx = effectiveTargetX - p.x;
        const dy = effectiveTargetY - p.y;

        let ax = dx * SPRING_STIFFNESS;
        let ay = dy * SPRING_STIFFNESS;

        if (isWaiting) {
            ax *= 0.0; // Freeze until delay passes
            ay *= 0.0;
        } else {
            p.color = p.targetColor;
        }

        p.vx += ax;
        p.vy += ay;

        p.vx *= DAMPING;
        p.vy *= DAMPING;

        p.x += p.vx;
        p.y += p.vy;

        // 5. Draw
        if (p.color === 'rgba(0,0,0,0)') continue;

        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isCar, imagesLoaded]);

  return (
    <canvas
      ref={canvasRef}
      width={2400}
      height={2400}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        filter: 'drop-shadow(0 0 6px rgba(100, 200, 255, 0.5))'
      }}
    />
  );
}
