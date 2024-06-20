import Social from '../Social';
import { cn } from '@/lib/utils';

export default function Footer({ className }: { className?: string }) {
  const cls = cn('flex', 'place-items-center', 'gap-6', className);

  return (
    <div className={cls}>
      <Social url='https://github.com/Zeno2019/tiny-minesweeper' />
      <Social url='web.okjike.com' user='u/939FB4E7-2C65-43CA-8AFD-127E9A9B6A6D' />
    </div>
  );
}
