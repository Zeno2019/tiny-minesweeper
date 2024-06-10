import React from 'react';
import Block from './plugin/Block';
import { cn, isLeagalGameEl } from '@/lib/utils';
import { GameInstance } from '@/logic';
import { useSnapshot } from 'valtio';
import { of, fromEvent, map, catchError } from 'rxjs';

const MineSweeper = new GameInstance();
// const MineSweeper = new GameInstance(30, 16);

export default function DashBoard() {
  const { board, w, h } = useSnapshot(MineSweeper.state);

  // 此处为解决 tailwind grid-rows-${w} 有时不生效的问题
  const layoutCls = cn(
    {
      'grid-cols-9': w <= 9,
      'grid-cols-16': w === 16,
      'grid-cols-30': w === 30,
      'grid-rows-9': h <= 9,
      'grid-rows-16': h === 16,
    },
    'grid',
    'auto-rows-min',
    'min-h-[16rem]',
    'p-4'
  );

  const cls = cn(layoutCls);

  const ref = React.useRef(null);

  React.useEffect(() => {
    const bEl = ref.current;

    if (bEl) {
      // Event Watcher
      fromEvent<MouseEvent>(bEl, 'click')
        .pipe(
          map((ev) => {
            const target = ev?.target as HTMLElement;

            if (isLeagalGameEl(ev)) {
              const x = target.getAttribute('data-x');
              const y = target.getAttribute('data-y');

              const position = { x: Number(x), y: Number(y) };
              console.info('MineSweeper', MineSweeper, ev, { x, y });

              MineSweeper.checkGameStatus(position);

              return position;
            }
          }),
          catchError((err) => {
            console.error('Error occurred', err);

            return of(null);
          })
        )
        .subscribe({
          next: (result) => {
            if (result) {
              console.info('Watcher Next', result);
            } else {
              console.error('Error occurred and was handled');
            }
          },
          error: (err) => {
            console.error('Unhandled Error', err);
          },

          complete: () => {
            console.info('Watcher Complete');
          },
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
