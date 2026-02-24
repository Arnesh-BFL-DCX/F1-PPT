const segmentBaseStyle = {
  width: '25.278px',
  height: '10px',
  borderRadius: '6px',
  flexShrink: 0,
} as const;

function VerticalLine({ src, width }: { src: string; width: string }) {
  return (
    <div
      style={{
        width: '1.736px',
        height: width,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        style={{
          width,
          height: '1.736px',
          transform: 'rotate(90deg)',
          display: 'block',
          maxWidth: 'none',
        }}
      />
    </div>
  );
}

function SegmentedBar({
  activeCount,
  activeBackground,
}: {
  activeCount: number;
  activeBackground: string;
}) {
  return (
    <div
      className="flex items-center"
      style={{
        gap: '6.322px',
        minWidth: '151.668px',
        flex: '1 0 0',
      }}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          style={{
            ...segmentBaseStyle,
            background:
              index < activeCount ? activeBackground : 'var(--color-score-bar-bg)',
            opacity: index < activeCount ? 1 : 0.5,
          }}
        />
      ))}
    </div>
  );
}

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
      <div
        className="flex items-center"
        style={{
          gap: '54px',
          padding: '0 24px',
          height: '49px',
        }}
      >
        <div className="flex flex-1 flex-col items-start justify-center min-w-0">
          <div className="flex items-center w-full" style={{ gap: '12px' }}>
            <div
              style={{
                flex: '1 0 0',
                height: '10px',
                borderRadius: '7.5px',
                background: 'var(--color-score-bar-bg)',
                minWidth: 0,
              }}
            >
              <div
                style={{
                  width: '142px',
                  height: '10px',
                  borderRadius: '7.5px',
                  background: 'var(--gradient-progress)',
                }}
              />
            </div>
            <span
              style={{
                fontFamily: 'var(--font-formula1)',
                fontWeight: 400,
                fontSize: '24px',
                lineHeight: '1.3',
                letterSpacing: '-0.16px',
                color: 'var(--color-score-commitment)',
              }}
            >
              100
            </span>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-rubik)',
              fontWeight: 300,
              fontSize: '12px',
              lineHeight: '1.5',
              color: 'var(--color-text-secondary)',
            }}
          >
            Commitment
          </span>
        </div>

        <div className="flex flex-1 flex-col items-start justify-center min-w-0">
          <div className="flex items-center w-full" style={{ gap: '12px' }}>
            <SegmentedBar activeCount={4} activeBackground="var(--gradient-metric-blue)" />
            <span
              style={{
                fontFamily: 'var(--font-formula1)',
                fontWeight: 400,
                fontSize: '24px',
                lineHeight: '1.3',
                letterSpacing: '-0.16px',
                background: 'var(--gradient-metric-blue)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              100
            </span>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-rubik)',
              fontWeight: 300,
              fontSize: '12px',
              lineHeight: '1.5',
              color: 'var(--color-text-secondary)',
            }}
          >
            Drive
          </span>
        </div>

        <div className="flex flex-1 flex-col items-start justify-center min-w-0">
          <div className="flex items-center w-full" style={{ gap: '12px' }}>
            <SegmentedBar activeCount={3} activeBackground="var(--color-chart-green)" />
            <span
              style={{
                fontFamily: 'var(--font-formula1)',
                fontWeight: 400,
                fontSize: '24px',
                lineHeight: '1.3',
                letterSpacing: '-0.16px',
                color: 'var(--color-chart-green)',
              }}
            >
              100
            </span>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-rubik)',
              fontWeight: 300,
              fontSize: '12px',
              lineHeight: '1.5',
              color: 'var(--color-text-secondary)',
            }}
          >
            Passion
          </span>
        </div>
      </div>

      <div className="flex flex-col items-start w-full" style={{ gap: '4px' }}>
        <div className="flex items-center shrink-0" style={{ gap: '29px', height: '59.492px' }}>
          <span
            style={{
              fontFamily: 'var(--font-formula1)',
              fontWeight: 400,
              fontSize: '24px',
              fontStyle: 'italic',
              color: '#ffffff',
              lineHeight: 'normal',
              flexShrink: 0,
            }}
          >
            4
          </span>

          <div className="flex items-center shrink-0" style={{ gap: '12px' }}>
            <VerticalLine src="/bottom-line-left.svg" width="59.492px" />

            <div className="flex flex-col items-start shrink-0 leading-none">
              <span
                style={{
                  fontFamily: 'var(--font-formula1)',
                  fontWeight: 400,
                  fontSize: '18px',
                  lineHeight: 'normal',
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
                  lineHeight: 'normal',
                  color: 'var(--color-accent-orange)',
                }}
              >
                FINANCE
              </span>
              <div className="flex items-center shrink-0" style={{ gap: '4px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-formula1)',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: 'normal',
                    color: 'var(--color-company-status)',
                    textAlign: 'right',
                  }}
                >
                  LIMITED
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/bajaj-finance-badge.png"
                  alt=""
                  style={{ width: '16.492px', height: '16.492px', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              width: '19px',
              height: '41px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-formula1)',
                fontWeight: 700,
                fontSize: '16px',
                lineHeight: 'normal',
                color: 'var(--color-text-muted)',
                transform: 'rotate(-90deg)',
                textAlign: 'right',
              }}
            >
              AOP
            </span>
          </div>

          <div className="flex items-center shrink-0 text-center" style={{ gap: '17px' }}>
            <div className="flex flex-col items-center shrink-0" style={{ width: '53px', gap: '4px' }}>
              <span
                style={{
                  width: '100%',
                  fontFamily: 'var(--font-formula1)',
                  fontWeight: 400,
                  fontSize: '18px',
                  lineHeight: 'normal',
                  fontStyle: 'italic',
                  color: 'var(--color-year-red)',
                  opacity: 0.5,
                }}
              >
                2024
              </span>
              <span
                style={{
                  width: '100%',
                  fontFamily: 'var(--font-formula1)',
                  fontWeight: 400,
                  fontSize: '10px',
                  lineHeight: 'normal',
                  color: 'var(--color-text-muted)',
                  textShadow: '0px 0px 1.736px rgba(0, 0, 0, 0.7)',
                }}
              >
                Year
              </span>
            </div>

            <div className="flex flex-col items-center shrink-0" style={{ width: '58px', gap: '4px' }}>
              <span
                style={{
                  width: '100%',
                  fontFamily: 'var(--font-formula1)',
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: 'normal',
                  fontStyle: 'italic',
                  color: 'var(--color-accent-red)',
                }}
              >
                2025
              </span>
              <span
                style={{
                  width: '100%',
                  fontFamily: 'var(--font-formula1)',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: 'normal',
                  color: 'var(--color-text-muted)',
                  textShadow: '0px 0px 1.736px rgba(0, 0, 0, 0.7)',
                }}
              >
                Year
              </span>
            </div>

            <div className="flex flex-col items-center shrink-0" style={{ width: '58px', gap: '4px' }}>
              <span
                style={{
                  width: '100%',
                  fontFamily: 'var(--font-formula1)',
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: 'normal',
                  fontStyle: 'italic',
                  color: 'var(--color-year-green)',
                }}
              >
                2026
              </span>
              <span
                style={{
                  width: '100%',
                  fontFamily: 'var(--font-formula1)',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: 'normal',
                  color: 'var(--color-text-muted)',
                  textShadow: '0px 0px 1.736px rgba(0, 0, 0, 0.7)',
                }}
              >
                Year
              </span>
            </div>

            <div className="flex flex-col items-center shrink-0" style={{ width: '52px', gap: '4px' }}>
              <span
                style={{
                  width: '100%',
                  fontFamily: 'var(--font-formula1)',
                  fontWeight: 400,
                  fontSize: '18px',
                  lineHeight: 'normal',
                  fontStyle: 'italic',
                  color: 'var(--color-year-green)',
                  opacity: 0.5,
                }}
              >
                2027
              </span>
              <span
                style={{
                  width: '100%',
                  fontFamily: 'var(--font-formula1)',
                  fontWeight: 400,
                  fontSize: '10px',
                  lineHeight: 'normal',
                  color: 'var(--color-text-muted)',
                  textShadow: '0px 0px 1.736px rgba(0, 0, 0, 0.7)',
                }}
              >
                Year
              </span>
            </div>
          </div>

          <div
            style={{
              width: '19px',
              height: '41px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-formula1)',
                fontWeight: 700,
                fontSize: '16px',
                lineHeight: 'normal',
                color: 'var(--color-year-green)',
                transform: 'rotate(-90deg)',
                textAlign: 'right',
              }}
            >
              AOP
            </span>
          </div>

          <div className="flex items-center shrink-0" style={{ gap: '12px' }}>
            <div className="flex flex-col items-end shrink-0 leading-none">
              <span
                style={{
                  fontFamily: 'var(--font-formula1)',
                  fontWeight: 400,
                  fontSize: '18px',
                  lineHeight: 'normal',
                  color: '#ffffff',
                  textAlign: 'right',
                }}
              >
                BAJAJ
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-formula1)',
                  fontWeight: 700,
                  fontSize: '24px',
                  lineHeight: 'normal',
                  color: 'var(--color-chart-steel)',
                  textAlign: 'right',
                }}
              >
                FINANCE
              </span>
              <div className="flex items-center shrink-0" style={{ gap: '4px', height: '15.624px' }}>
                <div
                  style={{
                    position: 'relative',
                    width: '16px',
                    height: '16px',
                    borderRadius: '11px',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/bajaj-logo-container.svg"
                    alt=""
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                  />
                  <div style={{ position: 'absolute', inset: '18.31% 18.58% 15.67% 21.46%' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/bajaj-logo.png"
                      alt=""
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                    />
                  </div>
                  <div style={{ position: 'absolute', inset: '20.01% 23.06% 19.99% 23.06%' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/bajaj-logo-inner.svg"
                      alt=""
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                    />
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-formula1)',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: 'normal',
                    color: 'var(--color-company-status)',
                    textAlign: 'right',
                  }}
                >
                  LIMITED
                </span>
              </div>
            </div>

            <VerticalLine src="/bottom-line-right.svg" width="58.624px" />
          </div>

          <span
            style={{
              fontFamily: 'var(--font-formula1)',
              fontWeight: 400,
              fontSize: '24px',
              fontStyle: 'italic',
              color: '#ffffff',
              lineHeight: 'normal',
              flexShrink: 0,
            }}
          >
            4
          </span>
        </div>

        <div className="flex w-full items-center" style={{ gap: '1px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bottom-divider-left.png"
            alt=""
            style={{
              flex: '1 0 0',
              height: '2.604px',
              objectFit: 'fill',
              display: 'block',
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bottom-divider-right.png"
            alt=""
            style={{
              flex: '1 0 0',
              height: '2.604px',
              objectFit: 'fill',
              display: 'block',
            }}
          />
        </div>
      </div>
    </div>
  );
}
