import { Card } from '@/components/slides/Card';

type AccentColor = 'green' | 'gold' | 'blue';

const colorMap: Record<AccentColor, string> = {
  green: 'var(--color-accent-green)',
  gold:  'var(--color-accent-gold)',
  blue:  'var(--color-accent-blue)',
};

interface AgendaCardData {
  heading: string;
  items: Array<{ text: string; color: AccentColor }>;
  modules: { completed: number; total: number };
}

interface AgendaCardProps {
  data: AgendaCardData;
}

export function AgendaCard({ data }: AgendaCardProps) {
  return (
    <Card className="w-[450px] h-[502px] relative flex flex-col" style={{ padding: 'var(--card-padding)' }}>
      {/* Heading + divider + items */}
      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[14px]">
          <p
            className="m-0"
            style={{
              fontFamily: 'var(--font-rubik)',
              fontWeight: 300,
              fontSize: '24px',
              color: 'var(--color-text-primary)',
              lineHeight: 1.3,
              letterSpacing: '-0.16px',
            }}
          >
            {data.heading}
          </p>
          <div
            className="w-full"
            style={{ height: '1.5px', background: 'var(--gradient-divider)' }}
          />
        </div>

        <div className="flex flex-col gap-[8px]">
          {data.items.map((item, i) => (
            <p
              key={i}
              className="m-0 uppercase"
              style={{
                fontFamily: 'var(--font-rubik)',
                fontWeight: i === 0 ? 400 : 300,
                fontSize: '20px',
                lineHeight: 1.5,
                color: colorMap[item.color],
              }}
            >
              {item.text}
            </p>
          ))}
        </div>
      </div>

      {/* Modules + track — absolutely positioned at bottom center */}
      <div
        className="absolute flex flex-col gap-[12px] w-[293px]"
        style={{
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: 0.3,
        }}
      >
        <div className="flex flex-col">
          <p
            className="m-0"
            style={{
              fontFamily: 'var(--font-rubik)',
              fontWeight: 400,
              fontSize: '14px',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.56,
              letterSpacing: '-0.16px',
            }}
          >
            Modules completed
          </p>
          <div className="flex items-center">
            <span
              style={{
                fontFamily: 'var(--font-rubik)',
                fontWeight: 500,
                fontSize: '32px',
                color: '#a3f9d1',
                lineHeight: 1.56,
                letterSpacing: '-0.16px',
              }}
            >
              {data.modules.completed}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-rubik)',
                fontWeight: 500,
                fontSize: '32px',
                color: '#999',
                lineHeight: 1.56,
                letterSpacing: '-0.16px',
              }}
            >
              /{data.modules.total}
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/agenda-icon-arrow.svg" alt="" width={32} height={32} />
          </div>
        </div>

        {/* Track map image */}
        <div style={{ aspectRatio: '1088 / 518', width: '100%', overflow: 'hidden', borderRadius: '6px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/agenda-track.png"
            alt="Track map"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      </div>
    </Card>
  );
}
