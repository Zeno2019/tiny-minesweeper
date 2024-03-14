import DashBoard from '@/components/DashBoard';
import ActionSpace from '@/components/DashBoard/ActionSpace';
import ModeToggle from '@/components/DashBoard/ModeToggle';
import RealTimeInfo from '@/components/DashBoard/RealTimeInfo';
import BaseLayout from '@/layouts/BaseLayout';

export default function App() {
  return (
    <BaseLayout title={'Tiny Minesweeper'} className='flex flex-col justify-evenly items-center gap-6'>
      <ActionSpace />
      <RealTimeInfo />
      <DashBoard />
      <ModeToggle />
    </BaseLayout>
  );
}
