import { Button } from '@/components/ui/button';

export default function ActionSpace() {
  return (
    <div className='flex place-content-center place-items-center gap-3'>
      <Button variant='ghost' className='text-lg bg-indigo-600 text-slate-100 hover:bg-indigo-700 hover:text-slate-100'>
        🎮 New Game
      </Button>
      <Button variant='ghost' className='text-lg bg-indigo-600 text-slate-100 hover:bg-indigo-700 hover:text-slate-100'>
        📑 Read Me
      </Button>
    </div>
  );
}
