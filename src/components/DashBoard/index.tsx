import React, { useCallback } from 'react';
import Block from './plugin/Block';
import { cn } from '@/lib/utils';
import { MineSweeper } from '@/logic';
import { useSnapshot } from 'valtio';
import useMineSweeperEvents from '@/lib/hooks/useMineSweeperEvents';
import { Position } from '@/type';

export default function DashBoard() {
  const { board, devMode, w, h } = useSnapshot(MineSweeper.state);

  // 此处为解决 tailwind grid-rows-${w} 有时不生效的问题
  const layoutCls = cn(
    {
      'grid-cols-9': w <= 9,
      'grid-cols-16': w === 16,
      'grid-cols-30': w === 30,
      'grid-rows-9': h <= 9,
      'grid-rows-16': h === 16,
      'scale-95': w === 30,
    },
    'grid',
    'auto-rows-min',
    'min-h-[16rem]'
  );

  const cls = cn(layoutCls);

  const ref = React.useRef<HTMLDivElement>(null);
  const onLeftClick = useCallback((position: Position) => MineSweeper.checkBlock(position), []);
  const onRightClick = useCallback((position: Position) => MineSweeper.toggleFlag(position), []);

  useMineSweeperEvents(ref, { onLeftClick, onRightClick });

  return (
    <div className={cls} ref={ref}>
      {board?.map((b) => {
        const { x, y, key, tipsNum, hasMine, isCovered, isFlagged, isDoubted } = b;

        return <Block key={key} tipsNum={tipsNum} hasMine={hasMine} isCovered={isCovered} isFlagged={isFlagged} devMode={devMode} data-x={x} data-y={y} />;
      })}
    </div>
  );
}
