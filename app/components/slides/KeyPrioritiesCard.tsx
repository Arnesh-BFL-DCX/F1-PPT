import { Card } from '@/components/slides/Card';

interface KeyPrioritiesData {
  items: Array<{ label: string; detail: string }>;
}

interface KeyPrioritiesCardProps {
  data: KeyPrioritiesData;
}

export function KeyPrioritiesCard({ data }: KeyPrioritiesCardProps) {
  return (
    <Card className="w-[450px] h-[402px] relative flex flex-col p-[32px] gap-[32px]">
      {/* Header */}
      <div className="flex flex-col gap-[16px] items-start shrink-0 w-full">
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
          KEY PRIORITIES
        </p>
        {/* Line: h-0 container, image absolutely inset -1.5px from top */}
        <div className="h-0 relative shrink-0 w-full">
          <div className="absolute inset-[-1.5px_0_0_0]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="block max-w-none size-full" src="/card-section-line.svg" />
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-[8px] items-start shrink-0 w-full">
        {data.items.map((item, i) => (
          <div key={i} className="flex gap-[12px] items-center shrink-0 w-full">
            <p
              className="m-0 shrink-0"
              style={{
                fontFamily: 'var(--font-rubik)',
                fontWeight: 300,
                fontSize: '16px',
                lineHeight: 1.5,
                color: '#ececec',
              }}
            >
              {item.label}
            </p>
            <div
              className="flex-1 h-[2px] min-w-0"
              style={{
                backgroundImage: 'linear-gradient(-0.216364deg, rgba(139,139,139,0.1) 23.884%, rgb(53,53,53) 89.534%)',
              }}
            />
            <p
              className="m-0 shrink-0 text-right"
              style={{
                fontFamily: 'var(--font-rubik)',
                fontWeight: 300,
                fontSize: '16px',
                lineHeight: 1.5,
                color: '#ececec',
              }}
            >
              {item.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom image group */}
      <div
        className="absolute"
        style={{
          bottom: '17.62px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <div className="relative shrink-0" style={{ width: '410px', height: '96.151px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="absolute block max-w-none size-full"
            src="/key-priorities-vector.svg"
          />
        </div>
        <div className="absolute" style={{ left: '15px', top: '4px', width: '383px', height: '90px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover size-full"
            src="/key-priorities-image.png"
          />
        </div>
      </div>
    </Card>
  );
}
