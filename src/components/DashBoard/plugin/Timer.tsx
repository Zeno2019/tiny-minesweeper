import PluginLayout from '@/layouts/PluginLayout';

import { TimerIcon } from '@/Icons';
import { MineSweeper } from '@/logic';
import { useSnapshot } from 'valtio';

export default function Timer() {
  const { endTime: time } = useSnapshot(MineSweeper.state);

  console.info('time...', time);

  return (
    <PluginLayout icon={<TimerIcon className='w-6 h-6' />}>
      <div className='text-2xl'>{'111'}</div>
    </PluginLayout>
  );
}
