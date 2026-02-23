import { Card } from '@/components/slides/Card';

interface GrowthMetric {
  label: string;
  color: 'green' | 'gold' | 'blue' | 'red';
}

interface GrowthData {
  metrics: GrowthMetric[];
}

interface GrowthCardProps {
  data: GrowthData;
}

const colorStyles: Record<string, { color: string; fontWeight: number; textTransform?: 'uppercase' }> = {
  green: { color: '#5de868', fontWeight: 400, textTransform: 'uppercase' },
  gold:  { color: '#e2c164', fontWeight: 300 },
  blue:  { color: '#5ea8ed', fontWeight: 300 },
  red:   { color: '#ed5e5e', fontWeight: 300 },
};

export function GrowthCard({ data }: GrowthCardProps) {
  return (
    <Card className="w-[450px] h-[317px] relative flex flex-col p-[32px] gap-[32px]">
      {/* Header */}
      <div className="flex flex-col gap-[16px] items-start shrink-0 w-full">
        <div className="flex flex-col gap-[14px] items-start shrink-0 w-full">
          <p
            className="m-0 w-full"
            style={{
              fontFamily: 'var(--font-rubik)',
              fontWeight: 300,
              fontSize: '24px',
              color: 'var(--color-text-primary)',
              lineHeight: 1.3,
              letterSpacing: '-0.16px',
            }}
          >
            GROWTH
          </p>
          {/* Line: h-0 container, image absolutely inset -1.5px from top */}
          <div className="h-0 relative shrink-0 w-full">
            <div className="absolute inset-[-1.5px_0_0_0]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block max-w-none size-full" src="/card-section-line.svg" />
            </div>
          </div>
        </div>

        {/* Legend items — using ul/li for bullet dots */}
        <div className="flex flex-col gap-[8px] items-start shrink-0" style={{ width: '370px' }}>
          {data.metrics.map((metric, i) => {
            const style = colorStyles[metric.color] ?? colorStyles.red;
            return (
              <ul
                key={i}
                className="block relative shrink-0 m-0 p-0"
                style={{
                  fontFamily: 'var(--font-rubik)',
                  fontWeight: style.fontWeight,
                  fontSize: '14px',
                  color: style.color,
                  textTransform: style.textTransform,
                  whiteSpace: 'nowrap',
                }}
              >
                <li
                  className="list-disc"
                  style={{ marginInlineStart: '21px', whiteSpace: 'pre-wrap' }}
                >
                  <span style={{ lineHeight: 1.5 }}>{metric.label}</span>
                </li>
              </ul>
            );
          })}
        </div>
      </div>

      {/* Growth chart — absolute at bottom, centered */}
      <div
        className="absolute"
        style={{
          bottom: '13px',
          left: 'calc(50% - 0.5px)',
          transform: 'translateX(-50%)',
          width: '435px',
          height: '147px',
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="absolute max-w-none"
            src="/growth-chart.png"
            style={{
              height: '116.35%',
              left: '-1.36%',
              top: '-0.1%',
              width: '109.54%',
            }}
          />
        </div>
      </div>
    </Card>
  );
}
