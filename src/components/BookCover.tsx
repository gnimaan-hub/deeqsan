import Image from "next/image";

type BookCoverProps = {
  title: string;
  author?: string;
  cover?: string;
  palette: [string, string];
  size?: "sm" | "md" | "lg";
  priority?: boolean;
};

const sizes = {
  sm: { w: 168, h: 240 },
  md: { w: 220, h: 314 },
  lg: { w: 288, h: 412 },
};

const imageSizes = {
  sm: "(max-width: 640px) 140px, 168px",
  md: "(max-width: 640px) 180px, 220px",
  lg: "(max-width: 640px) 220px, 288px",
};

export default function BookCover({ title, author, cover, palette, size = "md", priority = false }: BookCoverProps) {
  const { w, h } = sizes[size];
  const gradientId = `cover-leaf-${title.replace(/[^a-zA-Z0-9]/g, "").slice(0, 24)}`;

  return (
    <div
      className="cover-card group/cover mx-auto bg-grain"
      style={{ width: w, height: h }}
    >
      {cover ? (
        <Image
          src={cover}
          alt={`Couverture du livre ${title}`}
          width={w}
          height={h}
          priority={priority}
          sizes={imageSizes[size]}
          className="cover-card__img h-full w-full object-cover"
        />
      ) : (
        <div
          className="relative flex h-full w-full flex-col justify-between overflow-hidden p-5"
          style={{ background: `linear-gradient(160deg, ${palette[0]} 0%, ${palette[1]} 100%)` }}
        >
          <svg
            aria-hidden
            viewBox="0 0 220 314"
            className="cover-card__img pointer-events-none absolute inset-0 h-full w-full opacity-40"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M-10 250 C 40 190, 70 230, 110 180 S 190 120, 230 150 L 230 330 L -10 330 Z"
              fill={`url(#${gradientId})`}
            />
            <path
              d="M226 -10 C 190 40, 200 70, 150 100 C 110 128, 120 70, 80 40 L 60 -10 Z"
              fill="rgba(255,255,255,0.16)"
            />
            <g stroke="rgba(255,255,255,0.35)" strokeWidth="1.4" fill="none" strokeLinecap="round">
              <path d="M30 70 C 55 55, 60 95, 90 90 S 120 60, 150 75" />
              <path d="M30 70 C 45 80, 60 92, 90 90" />
              <path d="M168 250 C 150 225, 162 200, 145 178" />
              <path d="M168 250 C 182 232, 196 224, 205 205" />
            </g>
          </svg>

          <div className="relative z-10 flex items-start justify-between">
            <span className="h-1.5 w-10 rounded-full bg-surface/55" />
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-surface/20 text-[0.6rem] uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
              LE
            </span>
          </div>

          <div className="relative z-10">
            <p className="font-display text-lg font-semibold leading-tight text-white drop-shadow-sm text-balance">
              {title}
            </p>
            {author && (
              <p className="mt-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-white/70">
                {author}
              </p>
            )}
            <div className="mt-3 flex items-center gap-2">
              <span className="h-px flex-1 bg-surface/35" />
              <span className="text-[0.6rem] uppercase tracking-[0.22em] text-white/65">Deeqsan</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
