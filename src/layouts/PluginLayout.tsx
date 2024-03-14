import clsx from 'clsx';

export default function PluginLayout({ icon, children, onClick, className }: { icon: React.ReactNode; children?: React.ReactNode; className?: string; onClick?: () => void }) {
  const cls = clsx(['flex', 'justify-start', 'items-center', 'gap-1', className]);

  return (
    <div
      onClick={onClick}
      className={cls}
    >
      <div>{icon}</div>
      <div>{children}</div>
    </div>
  );
}
