import { Button } from '@/components/ui/button';
import { MineSweeper } from '@/logic';

export default function ModeToggle() {
  return (
    <div className='grid place-items-center'>
      <Button variant='ghost' className='text-lg bg-indigo-600 text-slate-100 hover:bg-indigo-700 hover:text-slate-100' onClick={() => MineSweeper.toggleDevMode()}>
        DEV MODE
      </Button>
    </div>
  );
}
