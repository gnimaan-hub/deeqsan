type EyebrowProps = {
  children: React.ReactNode;
  tone?: "jade" | "coral" | "mango" | "lagoon" | "leaf";
  className?: string;
};

const tones: Record<NonNullable<EyebrowProps["tone"]>, string> = {
  jade: "bg-jade-pale text-jade-deep",
  coral: "bg-coral/15 text-coral",
  mango: "bg-mango/20 text-mango",
  lagoon: "bg-lagoon/25 text-jade-pale",
  leaf: "bg-leaf/15 text-[#cfe6c8]",
};

export default function Eyebrow({ children, tone = "jade", className = "" }: EyebrowProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] transition-transform duration-300 hover:-translate-y-0.5 ${tones[tone]} ${className}`}
    >
      <span aria-hidden className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-50" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
      </span>
      {children}
    </span>
  );
}
