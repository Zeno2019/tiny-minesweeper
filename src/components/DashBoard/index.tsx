import Block from './plugin/Block';
import { BlockType, Position } from '@/type';
import { cn, genUUID } from '@/lib/utils';

function createBlock({ x, y }: Position): BlockType {
  return {
    key: genUUID(),
    x,
    y,
    tipsNum: 0,
    hasMine: false,
    isCovered: true,
    flagged: false,
  };
}

export default function DashBoard({ w = 9, h = 9 }: { w: number; h: number }) {
  // const board = new Array(w * h).fill(0);
  const board = Array.from({ length: w * h }, (_, idx) => {
    // 计算当前块的 x 和 y 坐标
    const x = idx % w;

    // 当前 block 下标除以行宽度，向下取整
    const y = Math.floor(idx / w);

    return createBlock({ x, y });
  });

  // const cls = clsx(['grid', `grid-rows-${w}`, `grid-cols-${h}`, 'min-h-[16rem]']);
  const cls = cn('min-h-[16rem]', 'grid', `grid-rows-${w}`, `grid-cols-${h}`,);

  return (
    <div
      className={cls}
      // className='grid grid-rows-9 grid-cols-9 min-h-[16rem]'
      onClick={(e) => {
        console.info('e.target', e.target);
        console.info('e.currentTarget', e.currentTarget);
      }}>
      {board?.map((b) => {
        return <Block key={b.key} tipsNum={b.tipsNum} />;
      })}
    </div>
  );
}
