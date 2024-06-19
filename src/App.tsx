import BaseLayout from '@/layouts/BaseLayout';
import DashBoard from '@/components/DashBoard';
import ActionSpace from '@/components/DashBoard/ActionSpace';
import ModeToggle from '@/components/DashBoard/ModeToggle';
import RealTimeInfo from '@/components/DashBoard/RealTimeInfo';
import CanvasConfetti from '@/components/CanvasConfetti';
import GameDialog from '@/components/GameDialog';

export default function App() {

  return (
    <BaseLayout title={'Tiny Minesweeper'} className='flex flex-col justify-evenly items-center gap-6'>
      <CanvasConfetti />
      <GameDialog />
      <ActionSpace />
      <RealTimeInfo />
      <DashBoard />
      <ModeToggle />
    </BaseLayout>
  );
}
