import React from 'react';
import JSConfetti from 'js-confetti';
import { useSnapshot } from 'valtio';
import { MineSweeper } from '@/logic';

// const confettiColors = [
//   '#4f46e5', // 基础颜色
//   '#4339F2', // 稍微深一点的颜色
//   '#6366F1', // 稍微偏浅一点的颜色
//   '#818CF8', // 更浅色
//   '#A5B4FC', // 浅色
//   '#C7D2FE', // 很浅的颜色
// ];

const CanvasConfetti = function () {
  const ref = React.useRef(null);
  const { status } = useSnapshot(MineSweeper.state);

  const isWon = status === 'won';
  const isLost = status === 'lost';
  const active = isWon || isLost;

  React.useEffect(() => {
    const canvasRef = ref.current;
    if (!canvasRef) return;

    let jsConfetti: JSConfetti;

    if (active) {
      jsConfetti = new JSConfetti({ canvas: canvasRef });

      if (isWon) {
        jsConfetti.addConfetti({
          confettiRadius: 6,
          emojis: ['🎉', '🎊', '🥳', '🍾'],
          emojiSize: 40,
          confettiNumber: 120,
        });

        return;
      }

      jsConfetti.addConfetti({
        confettiRadius: 6,
        emojis: ['🤡'],
        emojiSize: 40,
        confettiNumber: 120,
      });
    }

    return () => {
      jsConfetti?.clearCanvas();
    };
  }, [active]);

  return active && <canvas ref={ref} className='w-full h-full absolute pointer-events-none' />;
};

export default CanvasConfetti;
