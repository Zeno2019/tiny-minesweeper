import MineCounter from './plugin/MineCounter';
import Timer from './plugin/Timer';

export default function RealTimeInfo() {
  return (
    <div className='flex place-items-center gap-3'>
      <Timer />
      <MineCounter />
    </div>
  );
}
