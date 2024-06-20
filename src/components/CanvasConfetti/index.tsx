import React from 'react';
import JSConfetti from 'js-confetti';
import { useSnapshot } from 'valtio';
import { MineSweeper } from '@/logic';

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
