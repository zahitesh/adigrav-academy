interface LogoProps {
  size?: 'sm' | 'md';
}

export function Logo({ size = 'md' }: LogoProps) {
  const iconSize = size === 'sm' ? 'h-7 w-7' : 'h-8 w-8';
  const textSize = size === 'sm' ? 'text-sm' : 'text-[15px]';

  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <span
        className={`${iconSize} relative inline-flex items-center justify-center rounded-lg bg-[#14182c] border border-white/10 shadow-inner overflow-hidden p-1`}
      >
        <img
          src="/adigrav-logo.avif"
          alt="AdiGrav"
          className="h-full w-full object-contain"
        />
      </span>
      <span className={`${textSize} font-display font-bold tracking-[0.06em] text-[#f8faff]`}>
        ADIGRAV
      </span>
    </span>
  );
}
