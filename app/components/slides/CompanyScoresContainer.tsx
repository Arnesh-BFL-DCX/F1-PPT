export function CompanyScoresContainer() {
  return (
    <div
      style={{
        position: 'absolute',
        left: '557px',
        bottom: '12px',
        width: '806px',
        height: '139.096px',
        zIndex: 4,
      }}
    >
      {/* ── Top section: Score bars (49px) ── */}
      <div
        className="flex items-start"
        style={{ gap: '54px', padding: '0 24px', height: '49px' }}
      >
        {/* Commitment */}
        <div className="flex flex-col gap-[4px] flex-1">
          <div className="flex items-center justify-between">
            <span
              style={{
                fontFamily: 'var(--font-rubik)',
                fontWeight: 300,
                fontSize: '12px',
                color: 'var(--color-text-muted)',
              }}
            >
              Commitment
            </span>
            <span
              style={{
                fontFamily: 'var(--font-formula1)',
                fontWeight: 400,
                fontSize: '24px',
                color: 'var(--color-accent-orange)',
              }}
            >
              100
            </span>
          </div>
          <div
            style={{
              height: '10px',
              borderRadius: '5px',
              background: 'var(--gradient-progress)',
            }}
          />
        </div>

        {/* Drive */}
        <div className="flex flex-col gap-[4px] flex-1">
          <div className="flex items-center justify-between">
            <span
              style={{
                fontFamily: 'var(--font-rubik)',
                fontWeight: 300,
                fontSize: '12px',
                color: 'var(--color-text-muted)',
              }}
            >
              Drive
            </span>
            <span
              style={{
                fontFamily: 'var(--font-formula1)',
                fontWeight: 400,
                fontSize: '24px',
                background: 'var(--gradient-metric-blue)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              100
            </span>
          </div>
          <div className="flex gap-[4px]">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: '25.28px',
                  height: '10px',
                  borderRadius: '3px',
                  background: 'linear-gradient(to bottom, #28b5e0, #0496ff)',
                }}
              />
            ))}
            <div
              style={{
                width: '25.28px',
                height: '10px',
                borderRadius: '3px',
                background: 'rgba(255,255,255,0.15)',
              }}
            />
          </div>
        </div>

        {/* Passion */}
        <div className="flex flex-col gap-[4px] flex-1">
          <div className="flex items-center justify-between">
            <span
              style={{
                fontFamily: 'var(--font-rubik)',
                fontWeight: 300,
                fontSize: '12px',
                color: 'var(--color-text-muted)',
              }}
            >
              Passion
            </span>
            <span
              style={{
                fontFamily: 'var(--font-formula1)',
                fontWeight: 400,
                fontSize: '24px',
                color: 'var(--color-chart-green)',
              }}
            >
              100
            </span>
          </div>
          <div className="flex gap-[4px]">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: '25.28px',
                  height: '10px',
                  borderRadius: '3px',
                  background: 'var(--color-chart-green)',
                }}
              />
            ))}
            {[0, 1].map((i) => (
              <div
                key={i}
                style={{
                  width: '25.28px',
                  height: '10px',
                  borderRadius: '3px',
                  background: 'rgba(255,255,255,0.15)',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom section: Company details (66px) ── */}
      <div
        className="flex items-center"
        style={{ height: '66px', paddingTop: '8px', gap: '8px' }}
      >
        {/* Leading "4" */}
        <span
          style={{
            fontFamily: 'var(--font-formula1)',
            fontWeight: 400,
            fontSize: '24px',
            fontStyle: 'italic',
            color: '#ffffff',
            flexShrink: 0,
          }}
        >
          4
        </span>

        {/* Left divider */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/bottom-line-left.svg" alt="" style={{ height: '100%', flexShrink: 0 }} />

        {/* Left company info */}
        <div className="flex flex-col leading-none" style={{ flexShrink: 0 }}>
          <span
            style={{
              fontFamily: 'var(--font-formula1)',
              fontWeight: 400,
              fontSize: '18px',
              color: '#ffffff',
            }}
          >
            BAJAJ
          </span>
          <span
            style={{
              fontFamily: 'var(--font-formula1)',
              fontWeight: 700,
              fontSize: '24px',
              color: 'var(--color-accent-orange)',
            }}
          >
            FINANCE
          </span>
          <div className="flex items-center gap-[4px]">
            <span
              style={{
                fontFamily: 'var(--font-formula1)',
                fontWeight: 400,
                fontSize: '14px',
                color: '#ffffff',
              }}
            >
              LIMITED
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bajaj-finance-badge.png" alt="" style={{ height: '16px' }} />
          </div>
        </div>

        {/* AOP left (rotated) */}
        <span
          style={{
            fontFamily: 'var(--font-formula1)',
            fontWeight: 700,
            fontSize: '16px',
            color: 'var(--color-text-muted)',
            transform: 'rotate(-90deg)',
            flexShrink: 0,
          }}
        >
          AOP
        </span>

        {/* Year timeline */}
        <div className="flex items-end gap-[12px] flex-1 justify-center">
          {[
            { year: '2024', label: 'Year', color: 'var(--color-accent-red)', size: '18px', opacity: 0.5, italic: true },
            { year: '2025', label: 'Year', color: 'var(--color-accent-red)', size: '20px', opacity: 1, italic: true },
            { year: '2026', label: 'Year', color: 'var(--color-accent-green)', size: '20px', opacity: 1, italic: true, highlight: true },
            { year: '2027', label: 'Year', color: 'var(--color-accent-green)', size: '18px', opacity: 0.5, italic: true },
          ].map(({ year, label, color, size, opacity, italic, highlight }) => (
            <div
              key={year}
              className="flex flex-col items-center"
              style={{ opacity }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-formula1)',
                  fontWeight: 400,
                  fontSize: '10px',
                  color: 'var(--color-text-muted)',
                  letterSpacing: '0.5px',
                }}
              >
                {label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-formula1)',
                  fontWeight: highlight ? 700 : 400,
                  fontSize: size,
                  color,
                  fontStyle: italic ? 'italic' : 'normal',
                }}
              >
                {year}
              </span>
            </div>
          ))}
        </div>

        {/* AOP right (rotated) */}
        <span
          style={{
            fontFamily: 'var(--font-formula1)',
            fontWeight: 700,
            fontSize: '16px',
            color: 'var(--color-accent-green)',
            transform: 'rotate(-90deg)',
            flexShrink: 0,
          }}
        >
          AOP
        </span>

        {/* Right company info */}
        <div className="flex flex-col items-end leading-none" style={{ flexShrink: 0 }}>
          <span
            style={{
              fontFamily: 'var(--font-formula1)',
              fontWeight: 400,
              fontSize: '18px',
              color: '#ffffff',
            }}
          >
            BAJAJ
          </span>
          <span
            style={{
              fontFamily: 'var(--font-formula1)',
              fontWeight: 700,
              fontSize: '24px',
              color: 'var(--color-chart-steel)',
            }}
          >
            FINANCE
          </span>
          <div className="flex items-center gap-[4px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bajaj-logo-container.svg" alt="" style={{ height: '16px' }} />
            <span
              style={{
                fontFamily: 'var(--font-formula1)',
                fontWeight: 400,
                fontSize: '14px',
                color: '#ffffff',
              }}
            >
              LIMITED
            </span>
          </div>
        </div>

        {/* Right divider */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/bottom-line-right.svg" alt="" style={{ height: '100%', flexShrink: 0 }} />

        {/* Trailing "4" */}
        <span
          style={{
            fontFamily: 'var(--font-formula1)',
            fontWeight: 400,
            fontSize: '24px',
            fontStyle: 'italic',
            color: '#ffffff',
            flexShrink: 0,
          }}
        >
          4
        </span>
      </div>

      {/* ── Bottom divider line ── */}
      <div className="flex w-full" style={{ height: '2.604px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/bottom-divider-left.png" alt="" style={{ flex: 1, height: '100%', objectFit: 'fill' }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/bottom-divider-right.png" alt="" style={{ flex: 1, height: '100%', objectFit: 'fill' }} />
      </div>
    </div>
  );
}
