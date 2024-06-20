import { fromEvent, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import React from 'react';
import { isLeagalGameEl } from '@/lib/utils';

function useMineSweeperEvents(ref: React.MutableRefObject<HTMLDivElement | null>, { onLeftClick, onRightClick }: { onLeftClick?: Function; onRightClick?: Function }) {
  const createEventStream$ = (eventName: string, handler: Function) => {
    const el = ref?.current;
    if (!el) return;

    return fromEvent<MouseEvent>(el, eventName)
      .pipe(
        map((ev) => {
          if (eventName === 'contextmenu') {
            ev.preventDefault();
          }

          const target = ev?.target as HTMLElement;

          if (isLeagalGameEl(ev)) {
            const x = target.getAttribute('data-x');
            const y = target.getAttribute('data-y');
            const position = { x: Number(x), y: Number(y) };

            handler(position);

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
        error: (err) => console.error('Unhandled Error', err),
        complete: () => console.info('Watcher Complete'),
      });
  };

  React.useEffect(() => {
    const leftClick$ = createEventStream$('click', onLeftClick ? onLeftClick : () => {});
    const rightClick$ = createEventStream$('contextmenu', onRightClick ? onRightClick : () => {});

    return () => {
      leftClick$?.unsubscribe();
      rightClick$?.unsubscribe();
    };
  }, []);
}

export default useMineSweeperEvents;
