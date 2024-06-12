import { BombIcon } from '@/Icons';
import { MineSweeper } from '@/logic';
import { useSnapshot } from 'valtio';

const Bomb = (props: { devMode?: boolean }) => {
  const { devMode } = props;
  const { status } = useSnapshot(MineSweeper.state);
  const isBoom = status === 'lost';

  return isBoom || devMode ? <BombIcon className='w-5 h-5 absolute pointer-events-none' /> : null;
};

export default Bomb;
