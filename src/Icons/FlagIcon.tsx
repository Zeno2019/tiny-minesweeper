export default function FlagIcon({ width, height, className }: IconProps) {
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' fill='rgb(79, 70, 229)' stroke='currentColor' strokeWidth={'0.05rem'} strokeLinecap='round' strokeLinejoin='round' className={className}>
      <path d='M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z' />
      <line x1='4' x2='4' y1='22' y2='15' />
    </svg>
  );
}
