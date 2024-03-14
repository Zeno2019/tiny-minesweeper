import PluginLayout from '@/layouts/PluginLayout';

import { TimerIcon } from '@/Icons';

export default function Timer() {
  return (
    <PluginLayout icon={<TimerIcon className='w-6 h-6' />}>
      <div className='text-2xl'>106</div>
    </PluginLayout>
  );
}
