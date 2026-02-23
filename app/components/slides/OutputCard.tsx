import { Card } from '@/components/slides/Card';

interface OutputMetric {
  value: string;
  sub?: string;
  description: string;
}

interface OutputData {
  metrics: OutputMetric[];
}

interface OutputCardProps {
  data: OutputData;
}

export function OutputCard({ data }: OutputCardProps) {
  return (
    <Card
      className="w-[450px] h-[556.78px] relative flex flex-col gap-[24px] items-center pt-[32px] px-[32px]"
      style={{ overflow: 'clip' }}
    >
      {/* Header */}
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
          OUTPUT
        </p>
        {/* Line: h-0 container, image absolutely inset -1.5px from top */}
        <div className="h-0 relative shrink-0 w-full">
          <div className="absolute inset-[-1.5px_0_0_0]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="block max-w-none size-full" src="/card-section-line.svg" />
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="flex flex-col gap-[16px] items-start shrink-0 w-full">
        {data.metrics.map((metric, i) => (
          <div
            key={i}
            className="flex gap-[24px] h-[70px] items-center justify-center px-[24px] py-[16px] relative shrink-0 w-full rounded-[12px]"
            style={{
              background: 'rgba(15,23,52,0.6)',
              border: '1px solid #353f68',
            }}
          >
            {/* Metric Icon — 80×80, overflows the 70px row by 5px top+bottom */}
            <div className="relative shrink-0" style={{ width: '80px', height: '80px' }}>
              {/* Background ring */}
              <div className="absolute left-0 top-0" style={{ width: '80px', height: '80px' }}>
                <div className="absolute inset-[0_0_16.7%_0]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" className="block max-w-none size-full" src="/metric-circle-bg.svg" />
                </div>
              </div>
              {/* Colored arc */}
              <div className="absolute left-0 top-0" style={{ width: '80px', height: '80px' }}>
                <div className="absolute inset-[0_0_16.7%_0]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" className="block max-w-none size-full" src="/metric-circle-arc.svg" />
                </div>
              </div>
              {/* Text — centered, absolutely positioned */}
              <div
                className="absolute text-center"
                style={{
                  left: 'calc(50% + 0.5px)',
                  transform: 'translateX(-50%)',
                  top: metric.sub ? '18.42px' : '24.5px',
                  whiteSpace: 'nowrap',
                }}
              >
                <p
                  className="m-0"
                  style={{
                    fontFamily: 'var(--font-rubik)',
                    fontWeight: 500,
                    fontSize: '24px',
                    lineHeight: 1.3,
                    color: '#ffffff',
                    letterSpacing: '-0.16px',
                  }}
                >
                  {metric.value}
                </p>
                {metric.sub && (
                  <p
                    className="m-0"
                    style={{
                      fontFamily: 'var(--font-rubik)',
                      fontWeight: 500,
                      fontSize: '14px',
                      lineHeight: 1.3,
                      color: '#ffffff',
                      letterSpacing: '-0.16px',
                    }}
                  >
                    {metric.sub}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-1 flex-col items-start min-w-0">
              <p
                className="m-0"
                style={{
                  fontFamily: 'var(--font-rubik)',
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: 'normal',
                  color: '#ececec',
                }}
              >
                {metric.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Output graph — absolute, bleeds at bottom */}
      <div
        className="absolute flex items-center justify-center"
        style={{ height: '177.036px', left: '2px', top: '388.96px', width: '450px' }}
      >
        <div style={{ transform: 'scaleY(-1) rotate(180deg)', flexShrink: 0 }}>
          <div className="relative" style={{ height: '177.036px', width: '450px' }}>
            <div className="absolute inset-[0_-0.33%_-0.85%_-0.33%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block max-w-none size-full" src="/output-graph.svg" />
            </div>
          </div>
        </div>
      </div>

      {/* Graph icon */}
      <div className="absolute inset-[70.76%_10.22%_25.64%_85.33%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="absolute block max-w-none size-full" src="/output-graph-icon.svg" />
      </div>
    </Card>
  );
}
