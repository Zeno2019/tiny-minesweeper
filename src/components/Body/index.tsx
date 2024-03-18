import { cn } from '@/lib/utils';

export default function Body({ children, className }: { children?: React.ReactNode; className?: string }) {
  const cls = cn('min-h-[20rem]', 'grid', 'place-items-center', 'gap-6', className);

  return <div className={cls}>{children}</div>;
}
