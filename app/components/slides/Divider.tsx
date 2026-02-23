/**
 * Full-width horizontal divider — reusable across all slides.
 * Matches the Figma "Divider" vector: 1920×25px with a slight vertical bleed.
 */
export function Divider() {
  return (
    <div className="relative h-[25px] w-full">
      <div className="absolute inset-x-0 top-[-4%] bottom-[-4%]">
        <img
          src="/divider.svg"
          alt=""
          className="block size-full max-w-none"
          draggable={false}
        />
      </div>
    </div>
  );
}
