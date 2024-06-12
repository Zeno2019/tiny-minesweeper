import { cn } from '@/lib/utils';

const numColorMap: Record<string, string> = {
  0: 'text-gray-600',
  1: 'text-indigo-600',
  2: 'text-emerald-600',
  3: 'text-rose-600',
  4: 'text-violet-600',
  5: 'text-cyan-600',
  6: 'text-amber-600',
  7: 'text-fuchsia-600',
  8: 'text-sky-600',
};

const DyncNumber = (props: { number: number; isCovered: boolean; devMode?: boolean }) => {
  const { number, isCovered, devMode } = props;

  const baseCls = 'text-sm pointer-events-none';
  const cls = cn(baseCls, numColorMap[number] || '');

  const devEl = <p className={cls}>{isCovered ? number : number > 0 ? number : null}</p>;
  const normalEl = <p className={cls}>{!isCovered && number > 0 ? number : null}</p>;

  return devMode ? devEl : normalEl;
};

export default DyncNumber;
