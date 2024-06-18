import { Button } from '@/components/ui/button';
import { MineSweeper } from '@/logic';
import { useCallback } from 'react';
import { useSnapshot } from 'valtio';

export default function ActionSpace() {
  const { w, h } = useSnapshot(MineSweeper.state);

  const onClick = useCallback(() => MineSweeper.reset({ w, h }), [w, h]);

  return (
    <div className='flex place-content-center place-items-center gap-3'>
      <Button variant='ghost' className='text-lg bg-indigo-600 text-slate-100 hover:bg-indigo-700 hover:text-slate-100' onClick={onClick}>
        🎮 New Game
      </Button>
      <Button variant='ghost' className='text-lg bg-indigo-600 text-slate-100 hover:bg-indigo-700 hover:text-slate-100'>
        📑 Read Me
      </Button>
    </div>
  );
}
