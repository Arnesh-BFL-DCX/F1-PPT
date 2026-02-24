"use client";

import { useState, useEffect } from "react";

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

  return (
    <div className="relative w-full aspect-square">
      {/* Background vortex container - Single vortex that transforms */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
        <div
          className="overflow-visible"
          style={{
            width: '800px',
            height: '800px',
            flexShrink: 0,
          }}
        >
          <AnimatedVortex isExpanded={showCar} />
        </div>
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
    </div>
  );
}
