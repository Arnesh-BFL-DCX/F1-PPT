import { getSlideData } from '@/lib/slides';
import { SlideBackground } from '@/components/slides/SlideBackground';
import { SlideHeader } from '@/components/slides/SlideHeader';
import { CenterVisual } from '@/components/slides/hero/CenterVisual';
import { AgendaCard } from '@/components/slides/AgendaCard';
import { KeyPrioritiesCard } from '@/components/slides/KeyPrioritiesCard';
import { OutputCard } from '@/components/slides/OutputCard';
import { GrowthCard } from '@/components/slides/GrowthCard';
import { CompanyScoresContainer } from '@/components/slides/CompanyScoresContainer';

interface SlideOneData {
  title: string;
  agendaCard: {
    heading: string;
    items: Array<{ text: string; color: 'green' | 'gold' | 'blue' }>;
    modules: { completed: number; total: number };
  };
  keyPriorities: {
    items: Array<{ label: string; detail: string }>;
  };
  output: {
    metrics: Array<{ value: string; sub?: string; description: string }>;
  };
  growth: {
    metrics: Array<{ label: string; color: 'green' | 'gold' | 'blue' | 'red' }>;
  };
}

export default function SlideOne() {
  const data = getSlideData<SlideOneData>('slide-one');

  return (
    <div className="slide" style={{ padding: 0, display: 'block' }}>
      <div
        className="slide-canvas"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '1920px',
          height: '1080px',
          transform: 'translate(-50%, -50%) scale(min(calc(100vw / 1920px), calc(100vh / 1080px)))',
          transformOrigin: 'center center',
        }}
      >
        <SlideBackground />
        <SlideHeader title={data.title} />

        {/* 3-column content — absolutely positioned */}
        <div
          className="absolute z-3 flex items-start"
          style={{ top: '114.654px', left: '80px', right: '80px' }}
        >
          {/* Left column: 450px — AgendaCard (502) + gap (40) + KeyPrioritiesCard (402) */}
          <div className="w-[450px] shrink-0 flex flex-col gap-[40px]">
            <AgendaCard data={data.agendaCard} />
            <KeyPrioritiesCard data={data.keyPriorities} />
          </div>

          {/* Center: hero, 814px height */}
          <div className="flex-1 h-[814px] flex items-center justify-center">
            <CenterVisual />
          </div>

          {/* Right column: 450px — OutputCard (556.78) + gap (40) + GrowthCard (317) */}
          <div className="w-[450px] shrink-0 flex flex-col gap-[40px]">
            <OutputCard data={data.output} />
            <GrowthCard data={data.growth} />
          </div>
        </div>

        {/* Bottom band */}
        <CompanyScoresContainer />
      </div>
    </div>
  );
}
