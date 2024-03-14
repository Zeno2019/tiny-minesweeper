import { BombIcon } from '@/Icons';
import PluginLayout from '@/layouts/PluginLayout';

export default function MineCounter() {
  return (
    <PluginLayout icon={<BombIcon className='w-6 h-6' />}>
      <div className='text-2xl'>10</div>
    </PluginLayout>
  );
}
