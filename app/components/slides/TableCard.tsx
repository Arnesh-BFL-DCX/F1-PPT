import type { ReactNode } from 'react';

interface TableCardProps {
  children?: ReactNode;
  className?: string;
}

/**
 * Table/data card background.
 * Layers (bottom → top):
 *   1. Luminosity overlay     — rgba(0,0,0,0.04), mix-blend-mode luminosity
 *   2. Bottom depth gradient  — white fade, blurred, 148px tall
 *   3. Light border           — 1.5px white
 *   4. Dark border            — 1.5px blue-tinted (rgba(29,131,246,0.2))
 *      Both borders offset 0.45px at bottom to simulate a light source from above.
 */
export function TableCard({ children, className }: TableCardProps) {
  return (
    <div className={['table-card', className].filter(Boolean).join(' ')}>

      {/* Luminosity overlay */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-[var(--table-card-radius)] bg-[rgba(0,0,0,0.04)] mix-blend-luminosity pointer-events-none"
      />

      {/* Bottom depth gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-[148px] pointer-events-none">
        <div className="size-full rounded-[var(--table-card-radius)] bg-gradient-to-b from-transparent to-[rgba(255,255,255,0.24)] opacity-50 blur-[2px]" />
      </div>

      {/* Light border — white */}
      <div
        aria-hidden
        className="absolute inset-[0_0_0.45px_0] rounded-[var(--table-card-radius)] border-[1.5px] border-solid border-white pointer-events-none"
      />

      {/* Dark border — blue gradient (20% → 100% → 20% opacity, top to bottom) */}
      <div aria-hidden className="table-card-border-gradient" />

      {/* Content */}
      <div className="relative z-10 size-full">
        {children}
      </div>

    </div>
  );
}
