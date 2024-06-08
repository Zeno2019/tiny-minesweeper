import React from 'react';
import Block from './plugin/Block';
import { cn } from '@/lib/utils';
import { GameInstance } from '@/logic';
import { useSnapshot } from 'valtio';
import { fromEvent } from 'rxjs';

const MineSweeper = new GameInstance();

export default function DashBoard() {
  const { board, w, h } = useSnapshot(MineSweeper.state);

  // 此处为解决 tailwind grid-rows-${w} 有时不生效的问题
  const layoutCls = cn(w > 9 ? `grid-rows-${w}` : 'grid-rows-9', h > 9 ? `grid-cols-${h}` : 'grid-cols-9', 'min-h-[16rem]', 'grid');
  const cls = cn(layoutCls);

  const ref = React.useRef(null);

  React.useEffect(() => {
    const bEl = ref.current;

    if (bEl) {
      // Event Watcher
      fromEvent(bEl, 'click').subscribe((ev: any) => {
        const target = ev?.target;
        if (target) {
          const x = target.getAttribute('data-x');
          const y = target.getAttribute('data-y');
          const position = { x: Number(x), y: Number(y) };
          console.info('MineSweeper', MineSweeper);

          MineSweeper.checkGameStatus(position);
        }
      });
    }
  }, []);

  return (
    <div className={cls} ref={ref}>
      {board?.map((b) => {
        const { x, y, key, tipsNum, hasMine, isCovered, isDoubted, flagged } = b;

        return <Block key={key} tipsNum={tipsNum} hasMine={hasMine} isCovered={isCovered} data-x={x} data-y={y} />;
      })}
    </div>
  );
}
