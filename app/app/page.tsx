import { getSlideData } from '@/lib/slides';
import { SlideBackground } from '@/components/slides/SlideBackground';
import { SlideHeader } from '@/components/slides/SlideHeader';
import { CenterVisual } from '@/components/slides/hero/CenterVisual';
import { AgendaCard } from '@/components/slides/AgendaCard';

interface SlideOneData {
  title: string;
  agendaCard: {
    heading: string;
    items: Array<{ text: string; color: 'green' | 'gold' | 'blue' }>;
    modules: { completed: number; total: number };
  };
}

export default function SlideOne() {
  const data = getSlideData<SlideOneData>('slide-one');

  return (
    <div className="slide">
      <SlideBackground />
      <SlideHeader title={data.title} />
      <div className="slide-content w-full flex items-start gap-8 mb-auto pt-5">
        <AgendaCard data={data.agendaCard} />
        <div className="flex-1 flex items-center justify-center min-w-0">
          <CenterVisual />
        </div>
        <div className="w-[462px] shrink-0" />
      </div>
    </div>
  );
}
