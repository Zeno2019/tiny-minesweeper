import clsx from 'clsx';

export default function Header({ title, className }: { title?: string; className?: string }) {
  const cls = clsx(['text-3xl', 'font-medium', 'flex', 'place-items-center', className]);

  return <div className={cls}>{title && <h1>{title}</h1>}</div>;
}
