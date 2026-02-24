"use client";

import { motion } from "motion/react";
import svgPaths from "@/lib/vortex-paths";

interface AnimatedVortexProps {
  isExpanded: boolean;
}

export function AnimatedVortex({ isExpanded }: AnimatedVortexProps) {
  const transitionConfig = {
    duration: 1.8, // Match particle physics settling time
    ease: [0.3, 0.0, 0.2, 1.0] as [number, number, number, number], // Match spring physics feel
  };

  const CENTER_CIRCLE_KEY = "p99a7600"; // The center circle that should stay fixed

  // All paths with their original opacities
  const pathConfigs = [
    { key: "p13c5f200", opacity: 0.88 },
    { key: "p367aaf80", opacity: 0.95 },
    { key: "pb4f1700", opacity: 0.39 },
    { key: "p3d635f80", opacity: 0.8 },
    { key: "p379a3272", opacity: 0.42 },
    { key: "p38ecfb80", opacity: 0.16 },
    { key: "p2fe20700", opacity: 0.96 },
    { key: "p2ee06a80", opacity: 0.09 },
    { key: "p2401f80", opacity: 0.37 },
    { key: "p11353780", opacity: 0.28 },
    { key: "p2496bb00", opacity: 0.59 },
    { key: "p22f05600", opacity: 0.71 },
    { key: "pfe0780", opacity: 0.44 },
    { key: "p35a18900", opacity: 0.85 },
    { key: "p2bba7580", opacity: 0.69 },
    { key: "p16182f00", opacity: 0.73 },
    { key: "p23136f00", opacity: 0.34 },
    { key: "p25582c80", opacity: 0.56 },
    { key: "p3622fd00", opacity: 0.28 },
    { key: "p285c3100", opacity: 0.22 },
    { key: "p14570bc0", opacity: 0.98 },
    { key: CENTER_CIRCLE_KEY, opacity: 0.44 },
  ];

  // Center of the viewBox (747.944 / 2 = 373.972)
  const centerX = 373.972;
  const centerY = 373.972;

  return (
    <div className="relative size-full overflow-visible">
      <svg
        className="absolute block size-full overflow-visible"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 747.944 747.944"
      >
        <defs>
          <clipPath id="clip0_10_375">
            <rect fill="white" height="747.944" width="747.944" />
          </clipPath>
        </defs>
        <g opacity={0.05}>
          {pathConfigs.map((config, index) => {
            const isCenterCircle = config.key === CENTER_CIRCLE_KEY;
            const pathData = svgPaths[config.key as keyof typeof svgPaths];

            // Stagger timing: spread delays over 0-600ms like particles
            // 22 paths / 600ms = ~27ms per path
            const staggerDelay = (index / pathConfigs.length) * 0.6; // 0 to 0.6 seconds

            // Center circle stays fixed, other paths scale outward
            return (
              <motion.g
                key={config.key}
                initial={false}
                animate={{
                  scale: isCenterCircle ? 1 : isExpanded ? 1.7 : 1,
                }}
                transition={{
                  ...transitionConfig,
                  delay: isCenterCircle ? 0 : staggerDelay,
                }}
                style={{
                  transformOrigin: `${centerX}px ${centerY}px`,
                }}
              >
                <path
                  d={pathData}
                  fill="var(--fill-0, #F2F6FF)"
                  opacity={config.opacity}
                />
              </motion.g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
