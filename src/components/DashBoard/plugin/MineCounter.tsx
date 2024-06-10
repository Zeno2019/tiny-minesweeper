import { BombIcon } from '@/Icons';
import PluginLayout from '@/layouts/PluginLayout';
import { useSnapshot } from 'valtio';

import { MineSweeper } from '@/logic';

export default function MineCounter() {
  const { minesTotal } = useSnapshot(MineSweeper.state);

  return (
    <PluginLayout icon={<BombIcon className='w-6 h-6' />}>
      <div className='text-2xl'>{minesTotal}</div>
    </PluginLayout>
  );
}
