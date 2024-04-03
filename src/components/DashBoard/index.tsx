//@ts-nocheck

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
  const cls = cn(w > 9 ? `grid-rows-${w}` : 'grid-rows-9', h > 9 ? `grid-cols-${h}` : 'grid-cols-9', 'min-h-[16rem]', 'grid');

  React.useEffect(() => {
    const bEl = document.getElementById('board-wrapper');

    if (bEl) {
      console.info('bEl be create');

      // Event Watcher
      fromEvent(bEl, 'click').subscribe((ev) => {
        console.info('e', ev);
        const target = ev.target;
        if (target) {
          const blockX = target.getAttribute('data-x');
          const blockY = target.getAttribute('data-y');

          console.info('blockX', blockX, 'blockY', blockY);
        }
      });
    }
  }, []);

  return (
    <div className={cls} id='board-wrapper'>
      {board?.map((b) => {
        const { x, y } = b;

        return <Block key={b.key} tipsNum={b.tipsNum} data-x={x} data-y={y} />;
      })}
    </div>
  );
}
