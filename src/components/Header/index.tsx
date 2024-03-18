import { cn } from '@/lib/utils';

export default function Header({ title, className }: { title?: string; className?: string }) {
  const cls = cn('text-3xl', 'font-medium', 'flex', 'place-items-center', className);

  return <div className={cls}>{title && <h1>{title}</h1>}</div>;
}
