import { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const duration = 2500; // 2.5s loading time
    const intervalTime = 25;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(onComplete, 800); // 800ms fadeout transition
          }, 300);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Translate value for liquid rise: 100% (empty) to -28% (reaches very top rim of glass at 100%)
  const translateYPercent = 100 - (progress / 100) * 128;
  // Dynamic wave scale: stays full and rich as it fills
  const waveScale = 0.6 + (progress / 100) * 0.4;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Passion and culture loading..."
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#ECE9E5', // Warm cream background
        color: '#191714', // Rich brown
        zIndex: 9999,
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        justifyItems: 'center',
        alignItems: 'center',
        padding: '40px 20px',
        opacity: isFadingOut ? 0 : 1,
        visibility: isFadingOut ? 'hidden' : 'visible',
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.8s',
        fontFamily: "'MonumentGrotesk', sans-serif"
      }}
    >
      {/* Top Logo */}
      <div style={{ marginTop: '20px' }}>
        <img
          src="/logo.png"
          alt="Esterhazy Austria"
          style={{ width: '133px', height: 'auto', display: 'block' }}
        />
      </div>

      {/* Center Glass Animation */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
        <svg
          className="ov_visible"
          width="48"
          height="83"
          viewBox="0 0 42 83"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{ color: '#191714' }}
        >
          {/* Flipped for alignment to match original Next.js template scale/translate */}
          <g transform="translate(42 0) scale(-1 1)">
            <defs>
              <clipPath id="loader-glass-fill">
                <path d="M36.0578 3.00738L6.00404 3C4.48855 8.66609 2.3948 19.972 3.16489 25.633C3.45371 27.7747 4.16586 29.8401 5.26122 31.7127C6.27308 33.3942 7.57509 34.8892 9.10878 36.1309C12.6211 39.017 19.008 41.4097 20.4919 46L23.2259 44.0408C27.0981 40.9412 30.2566 38.434 33.5483 35.4689C36.6596 32.7095 38.581 28.8849 38.9202 24.7777C39.0657 23.1535 38.9907 20.869 38.867 19.2419C38.5562 15.1428 37.8049 10.9658 36.9714 6.93744C36.6992 5.62158 36.3255 4.30339 36.0578 3.00738Z"></path>
              </clipPath>
            </defs>
            
            {/* Liquid Fill Group */}
            <g clipPath="url(#loader-glass-fill)">
              {/* Translate group coordinates filling progress */}
              <g
                className="trf-b_fill-box trf-o_center_bottom"
                style={{
                  transform: `translateY(${translateYPercent}%)`,
                  transition: 'transform 0.05s linear'
                }}
              >
                <g className="anim_loaderWave_1500ms_ease-in-out_infinite">
                  <path
                    className="trf-b_fill-box trf-o_center_center"
                    fill="#191714"
                    style={{
                      transform: `scaleY(${waveScale})`,
                      transition: 'transform 0.05s linear',
                      animation: 'loaderWave 1.2s linear infinite'
                    }}
                    d="M-42 7C-31.5 7 -31.5 1 -21 1C-10.5 1 -10.5 7 0 7C10.5 7 10.5 1 21 1C31.5 1 31.5 7 42 7C52.5 7 52.5 1 63 1C73.5 1 73.5 7 84 7V86H-42V7Z"
                  ></path>
                </g>
              </g>
            </g>
            
            {/* Glass Outer Contour Path */}
            <path
              d="M19.7852 67.1143L19.7686 60.4961V60.4922L19.7441 57.0254V53.5586C19.7442 53.3244 19.7586 52.485 19.7568 51.7725C19.7559 51.3985 19.7512 51.023 19.7373 50.7119C19.7304 50.5567 19.7208 50.412 19.708 50.2891C19.6964 50.1769 19.6787 50.0466 19.6445 49.9404C18.7311 47.1025 16.6441 45.0539 14.3359 43.3125C13.1811 42.4413 11.952 41.6332 10.7725 40.8428C9.58619 40.0479 8.44828 39.2693 7.44531 38.4414L7.44238 38.4395L7.11816 38.1699C5.62093 36.8973 4.32868 35.4068 3.28613 33.75L3.06738 33.3926C1.8242 31.2561 1.01544 28.9005 0.6875 26.458V26.457C0.248389 23.2145 0.625014 18.3032 1.34375 13.3359C2.03412 8.56472 3.03469 3.79406 3.89258 0.5L38.1631 0.507812C38.3021 1.1461 38.4573 1.78697 38.6123 2.42188C38.8003 3.19193 38.9869 3.95445 39.1436 4.71484C40.1146 9.42951 40.9865 14.3007 41.3467 19.0723C41.4902 20.9693 41.5753 23.6147 41.4092 25.4775L41.4082 25.4805C41.0231 30.165 38.8413 34.5287 35.3066 37.6777L35.3047 37.6807C33.4155 39.3901 31.1805 40.7463 28.9746 42.2891C26.7935 43.8146 24.6754 45.5031 23.1768 47.8262C22.048 49.5767 22.2732 51.1097 22.2676 52.8291V52.8301L22.2627 58.0117L22.2344 66.3223C22.232 67.0293 22.2136 68.429 22.2441 69.8027C22.2594 70.49 22.2868 71.1775 22.335 71.7744C22.3822 72.3591 22.4523 72.8965 22.5645 73.2617L22.5664 73.2686C23.9263 77.505 28.1859 79.4714 32.0029 80.4648C32.4313 80.5765 33.1186 80.7161 33.6787 80.8516C34.2526 80.9903 34.7375 81.1347 35.0225 81.2832C35.3196 81.6101 35.3524 81.9532 35.3525 82.499L6.66602 82.498C6.68307 82.0957 6.7245 81.8129 6.78711 81.6094C6.86521 81.3557 6.96811 81.2449 7.09375 81.168C7.25181 81.0712 7.48513 81.0037 7.8877 80.9238C8.26741 80.8485 8.77935 80.7645 9.37305 80.6162C11.3185 80.1299 13.4821 79.3895 15.332 78.2393C17.184 77.0878 18.7548 75.5043 19.4443 73.3271C19.6683 72.6201 19.7461 71.3877 19.7754 70.2217C19.8052 69.0333 19.7852 67.8154 19.7852 67.1152V67.1143Z"
              stroke="#191714"
              strokeWidth="2"
              fill="none"
            ></path>
          </g>
        </svg>

        {/* Loading details */}
        <div style={{ textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: "'Canela', serif",
              fontWeight: 100,
              fontSize: '2rem',
              letterSpacing: '0.05em',
              marginBottom: '4px'
            }}
          >
            {Math.round(progress)}%
          </h2>
          <p
            style={{
              fontSize: '0.72rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              opacity: 0.65
            }}
          >
            Passion and culture loading...
          </p>
        </div>
      </div>

      {/* Empty bottom element for grid layout balance */}
      <div style={{ height: '54px' }}></div>
    </div>
  );
}
