type LogoProps = {
  className?: string;
  variant?: "ink" | "paper";
};

export default function Logo({ className = "", variant = "ink" }: LogoProps) {
  const textColor = "text-ink";
  const subColor = variant === "paper" ? "text-jade-pale" : "text-jade-bright";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect x="2" y="6" width="7" height="22" rx="1.5" fill="var(--jade)" />
        <rect x="11" y="3" width="7" height="25" rx="1.5" fill="var(--coral)" />
        <rect x="20" y="8" width="7" height="20" rx="1.5" fill="var(--mango)" />
        <path
          d="M5 28c4 3 18 3 24-3"
          stroke="var(--lagoon)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <span className="leading-none">
        <span className={`block font-display text-[1.05rem] font-semibold tracking-tight ${textColor}`}>
          Les Éditions
        </span>
        <span className={`block font-display text-[1.3rem] font-bold tracking-tight ${subColor}`}>
          Deeqsan
        </span>
      </span>
    </span>
  );
}
