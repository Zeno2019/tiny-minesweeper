import React from 'react';
import Block from './plugin/Block';
import { cn, isLeagalGameEl } from '@/lib/utils';
import { MineSweeper } from '@/logic';
import { useSnapshot } from 'valtio';
import { of, fromEvent, map, catchError } from 'rxjs';

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

  const ref = React.useRef(null);

  React.useEffect(() => {
    const boardEl = ref.current;
    if (!boardEl) return;

    // Event Watcher
    const leftClick$ = fromEvent<MouseEvent>(boardEl, 'click')
      .pipe(
        map((ev) => {
          const target = ev?.target as HTMLElement;

          if (isLeagalGameEl(ev)) {
            const x = target.getAttribute('data-x');
            const y = target.getAttribute('data-y');

            const position = { x: Number(x), y: Number(y) };
            MineSweeper.checkBlock(position);

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

    const rightClick$ = fromEvent<MouseEvent>(boardEl, 'contextmenu')
      .pipe(
        map((ev) => {
          ev.preventDefault();

          const target = ev?.target as HTMLElement;

          if (isLeagalGameEl(ev)) {
            const x = target.getAttribute('data-x');
            const y = target.getAttribute('data-y');

            const position = { x: Number(x), y: Number(y) };

            MineSweeper.toggleFlag(position);

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

    return () => {
      leftClick$.unsubscribe();
      rightClick$.unsubscribe();
    };
  }, []);

  return (
    <div className={cls} ref={ref}>
      {board?.map((b) => {
        const { x, y, key, tipsNum, hasMine, isCovered, isFlagged, isDoubted } = b;

        return <Block key={key} tipsNum={tipsNum} hasMine={hasMine} isCovered={isCovered} isFlagged={isFlagged} devMode={devMode} data-x={x} data-y={y} />;
      })}
    </div>
  );
}
