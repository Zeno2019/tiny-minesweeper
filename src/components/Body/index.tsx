import clsx from 'clsx';

export default function Body({ children, className }: { children?: React.ReactNode; className?: string }) {
  const cls = clsx(['min-h-[20rem]', 'grid', 'place-items-center', 'gap-6', className]);

  return <div className={cls}>{children}</div>;
}
