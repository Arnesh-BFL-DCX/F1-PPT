import { Divider } from './Divider';

interface SlideHeaderProps {
  title: string;
}

/**
 * Slide title + divider — absolutely positioned at the top of every slide.
 * Figma spec: total height 83px, h1 at top:10px, divider at top:56px.
 */
export function SlideHeader({ title }: SlideHeaderProps) {
  return (
    <div
      className="absolute top-0 left-0 w-full"
      style={{ height: '83px', zIndex: 3 }}
    >
      <h1 className="absolute w-full text-center" style={{ top: '10px' }}>
        {title}
      </h1>
      <div className="absolute left-0 w-full" style={{ top: '56px' }}>
        <Divider />
      </div>
    </div>
  );
}
