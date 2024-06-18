import { useEffect, useRef } from 'react';
import { _setInterval } from '../utils';

function useInterval(callback: Function, delay: number | null) {
  const callbackRef = useRef<Function>();

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    // 定义要循环调用的函数
    const tick = () => {
      if (callbackRef.current) {
        callbackRef.current();
      }
    };

    if (delay !== null) {
      // 使用 _setInterval 而不是原生的 setInterval
      const cancel = _setInterval({ cb: tick, interval: delay });

      return () => {
        cancel();
      };
    }
  }, [delay]);
}

export default useInterval;
