/**
 * Pixel-accurate recreation of the Figma "1var" background frame.
 * Layer order (bottom → top):
 *   1. gradient  — on the parent .slide via CSS
 *   2. noise     — vertically centred, mix-blend-mode overlay, opacity 0.3
 *   3. grid      — anchored top-left, bleeds one cell past the frame edges
 *
 * Dimensions are driven by CSS custom properties defined in globals.css:
 *   --slide-width / --slide-height
 *   --slide-grid-width / --slide-grid-height
 */
export function SlideBackground() {
  return (
    <>
      {/* Noise layer */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 mix-blend-overlay opacity-30 pointer-events-none"
        style={{ width: 'var(--slide-width)', height: 'var(--slide-height)', zIndex: 1 }}
      >
        <img
          src="/slide-noise.png"
          alt=""
          className="absolute block size-full max-w-none"
          draggable={false}
        />
      </div>

      {/* Grid layer */}
      <div
        className="absolute left-0 top-0 pointer-events-none"
        style={{ width: 'var(--slide-grid-width)', height: 'var(--slide-grid-height)', zIndex: 2 }}
      >
        <img
          src="/slide-grid.svg"
          alt=""
          className="absolute block size-full max-w-none"
          draggable={false}
        />
      </div>
    </>
  );
}
