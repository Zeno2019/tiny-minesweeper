import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { MineSweeper } from '@/logic';
import { useSnapshot } from 'valtio';

export default function ModeToggle() {
  const { devMode } = useSnapshot(MineSweeper.state);

  return (
    <div className='flex items-center space-x-2'>
      <Label htmlFor='dev-mode-switch' className='text-lg'>
        Dev
      </Label>
      <Switch id='dev-mode-switch' className='data-[state=checked]:bg-indigo-600' checked={devMode} onCheckedChange={() => MineSweeper.toggleDevMode()} />
    </div>
  );
}
