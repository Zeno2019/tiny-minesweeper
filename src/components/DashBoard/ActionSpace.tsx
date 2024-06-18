import { Button } from '@/components/ui/button';
import { MineSweeper } from '@/logic';
import { MatrixShape } from '@/type';
import { useCallback } from 'react';
import { useSnapshot } from 'valtio';

export default function ActionSpace() {
  const { w, h } = useSnapshot(MineSweeper.state);

  const onReset = useCallback(() => MineSweeper.reset({ w, h }), [w, h]);
  const onNewGame = useCallback((shape: MatrixShape) => MineSweeper.reset({ w: shape.w, h: shape.h }), []);

  return (
    <div className='flex flex-wrap place-content-center place-items-center gap-3'>
      <Button variant='ghost' className='text-lg bg-indigo-600 text-slate-100 hover:bg-indigo-700 hover:text-slate-100' onClick={() => onNewGame({ w: 9, h: 9 })}>
        Easy
      </Button>
      <Button variant='ghost' className='text-lg bg-indigo-600 text-slate-100 hover:bg-indigo-700 hover:text-slate-100' onClick={() => onNewGame({ w: 16, h: 16 })}>
        Medium
      </Button>
      <Button variant='ghost' className='text-lg bg-indigo-600 text-slate-100 hover:bg-indigo-700 hover:text-slate-100' onClick={() => onNewGame({ w: 30, h: 16 })}>
        Hard
      </Button>
      <Button variant='ghost' className='text-lg bg-indigo-600 text-slate-100 hover:bg-indigo-700 hover:text-slate-100' onClick={onReset}>
        🎮 New Game
      </Button>
      <Button variant='ghost' className='text-lg bg-indigo-600 text-slate-100 hover:bg-indigo-700 hover:text-slate-100'>
        📑 Read Me
      </Button>
    </div>
  );
}
