import React, { useEffect } from 'react';
import { TimerIcon } from '@/Icons';
import { MineSweeper } from '@/logic';
import { useSnapshot } from 'valtio';
import { _setInterval } from '@/lib/utils';
import { DateTime, Duration } from 'luxon';
import PluginLayout from '@/layouts/PluginLayout';
import useInterval from '@/lib/hooks/useInterval';

export default function Timer() {
  const { startTime, currentTime, minePlaced, status } = useSnapshot(MineSweeper.state);

  useInterval(
    () => {
      if (minePlaced) {
        const currTime = DateTime.now().toUnixInteger();
        MineSweeper.updateTime(currTime);
      }
    },
    minePlaced && status === 'playing' ? 1000 : null
  );

  const startTimeDate = DateTime.fromSeconds(startTime);
  const currentTimeDate = DateTime.fromSeconds(currentTime);
  let duration = 0;

  if (startTime && currentTime) {
    duration = currentTimeDate.diff(startTimeDate).as('seconds');
  }

  return (
    <PluginLayout icon={<TimerIcon className='w-6 h-6' />}>
      <div className='text-2xl'>{duration}</div>
    </PluginLayout>
  );
}
