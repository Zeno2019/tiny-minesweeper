import confetti from 'canvas-confetti';
import React from 'react';

const CanvasConfetti = function () {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const canvasRef = ref.current;
    if (!canvasRef) return;

    try {
      const myConfetti = confetti.create(canvasRef, {
        resize: true,
        useWorker: true,
      });

      myConfetti({
        particleCount: 280,
        spread: 180,
        angle: -60,
        origin: { x: 0, y: 0 },
        gravity: 0.3,
      });

      myConfetti({
        particleCount: 280,
        spread: 180,
        angle: -120,
        origin: { x: 1, y: 0 },
        gravity: 0.3,
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
      <canvas ref={ref} className='w-full h-full absolute' />
  );
};

export default CanvasConfetti;
