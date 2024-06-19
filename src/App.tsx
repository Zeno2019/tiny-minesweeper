import DashBoard from '@/components/DashBoard';
import ActionSpace from '@/components/DashBoard/ActionSpace';
import ModeToggle from '@/components/DashBoard/ModeToggle';
import RealTimeInfo from '@/components/DashBoard/RealTimeInfo';
import BaseLayout from '@/layouts/BaseLayout';
import CanvasConfetti from './components/CanvasConfetti';
import { useSnapshot } from 'valtio';
import { MineSweeper } from './logic';

export default function App() {
  const { status } = useSnapshot(MineSweeper.state);
  const isWon = status === 'won';
  const isLost = status === 'lost';

  return (
    <BaseLayout title={'Tiny Minesweeper'} className='flex flex-col justify-evenly items-center gap-6'>
      <CanvasConfetti active={isWon || isLost} isWon={isWon} />
      <ActionSpace />
      <RealTimeInfo />
      <DashBoard />
      <ModeToggle />
    </BaseLayout>
  );
}
