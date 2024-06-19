import React from 'react';
import { Dialog, DialogPortal, DialogContent, DialogOverlay, DialogFooter, DialogClose, DialogHeader } from '@/components/ui/dialog';
import { useSnapshot } from 'valtio';
import { MineSweeper } from '@/logic';

function GameDialog(props: any) {
  const [open, setOpen] = React.useState(false);
  const { status } = useSnapshot(MineSweeper.state);
  const needOpen = status === 'won' || status === 'lost';

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(needOpen);
    }, 1500);

    return () => clearTimeout(timer);
  }, [needOpen]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPortal>
        <DialogOverlay className='bg-blackA6 data-[state=open]:animate-overlayShow' />
        <DialogContent>
          <div className='flex justify-center text-2xl'>{status === 'won' ? '🥳 <You Win/> 🎉' : '🤡 <Game Over/> 🤡'}</div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

export default GameDialog;
