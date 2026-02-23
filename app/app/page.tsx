import { getSlideData } from '@/lib/slides';
import { SlideBackground } from '@/components/slides/SlideBackground';
import { SlideHeader } from '@/components/slides/SlideHeader';
import { Card } from '@/components/slides/Card';
import { TableCard } from '@/components/slides/TableCard';
import { CenterVisual } from '@/components/slides/hero/CenterVisual';

interface SlideOneData {
  title: string;
}

export default function SlideOne() {
  const data = getSlideData<SlideOneData>('slide-one');

  return (
    <div className="slide">
      <SlideBackground />
      <SlideHeader title={data.title} />
      <div className="slide-content w-full flex gap-6 px-8">
        {/* Left column */}
        <div className="flex flex-col gap-4 w-[280px] shrink-0">
          <Card className="flex-1 p-6" />
          <TableCard className="flex-1" />
        </div>

        {/* Center hero — width drives the square via aspect-square */}
        <div className="flex-1 flex items-center justify-center min-w-0">
          <div className="w-[1000px] shrink-0">
            <CenterVisual />
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4 w-[280px] shrink-0">
          <Card className="flex-1 p-6" />
          <Card className="flex-1 p-6" />
        </div>
      </div>
    </div>
  );
}
