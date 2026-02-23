"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

import { AnimatedVortex } from "@/components/slides/hero/AnimatedVortex";
import { ParticleImageMorph } from "@/components/slides/hero/ParticleImageMorph";

const imgBlob = "/particle-blob.png";
const imgCar  = "/particle-car.png";

const MORPH_INTERVAL_MS = 6000;

export function CenterVisual() {
  const [showCar, setShowCar] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCar((prev) => !prev);
    }, MORPH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const transitionConfig = {
    duration: 1.8, // Match particle and vortex animation timing
    ease: [0.3, 0.0, 0.2, 1.0] as [number, number, number, number], // Match spring physics feel
  };

  return (
    <div className="relative w-full aspect-square">
      {/* Background vortex container - Single vortex that transforms */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
        <motion.div
          className="overflow-visible"
          style={{
            width: '800px',
            height: '800px',
            flexShrink: 0,
            transformOrigin: "center center",
          }}
          initial={false}
          animate={{
            rotate: showCar ? 25 : 0, // Rotation for vortex feel
            filter: showCar
              ? "brightness(1)"
              : "drop-shadow(0 0 0px rgba(0,0,0,0)) brightness(1)",
          }}
          transition={transitionConfig}
        >
          <AnimatedVortex isExpanded={showCar} />
        </motion.div>
      </div>

      {/* Particle morph canvas */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <ParticleImageMorph
          blobSrc={imgBlob}
          carSrc={imgCar}
          isCar={showCar}
          className="size-full"
        />
      </div>

      {/* Pulsing radial glow - Enhanced for Car state */}
      <motion.div
        className="absolute inset-[-10%] rounded-full z-0 pointer-events-none"
        style={{
          background: showCar
            ? "radial-gradient(circle, rgba(50,200,255,0.15) 0%, rgba(0,100,255,0.08) 40%, transparent 70%)"
            : "radial-gradient(circle, rgba(0,240,200,0.12) 0%, rgba(0,160,255,0.06) 40%, transparent 70%)",
        }}
        animate={{
          scale: showCar ? [1, 1.2, 1] : [1, 1.1, 1],
          opacity: showCar ? [0.4, 0.7, 0.4] : [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: showCar ? 2.5 : 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
