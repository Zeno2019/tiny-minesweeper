import Block from './plugin/Block';
import { cn } from '@/lib/utils';
import { GameInstance } from '@/logic';

export default function DashBoard({ w = 9, h = 9 }: { w?: number; h?: number }) {
  // 此处为解决 tailwind grid-rows-${w} 有时不生效的问题
  const cls = cn(w > 9 ? `grid-rows-${w}` : 'grid-rows-9', h > 9 ? `grid-cols-${h}` : 'grid-cols-9', 'min-h-[16rem]', 'grid');

  const MineSweeper = new GameInstance().initBoard(w, h);
  const board = MineSweeper.state.board;

  return (
    <div
      className={cls}
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
