import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BlockType } from '@/type';
import { useSnapshot } from 'valtio';
import { MineSweeper } from '@/logic';
import DyncNumber from './DyncNumber';
import Bomb from './Bomb';

export interface BlockProps {
  devMode?: boolean;
  tipsNum: BlockType['tipsNum'];
  hasMine: BlockType['hasMine'];
  isCovered: BlockType['isCovered'];
  isFlagged: BlockType['isFlagged'];
  'data-x'?: BlockType['x'];
  'data-y'?: BlockType['y'];
  onClick?: () => void;
}

function transformCls({ isActived, isBoom }: { isActived: boolean; isBoom?: boolean }) {
  const baseCls = 'h-8 w-8 flex place-items-center m-[0.5px] rounded-[2px] border-indigo-300 border-[0.5px]';
  const inactivedCls = 'bg-indigo-200 hover:bg-indigo-100';
  const activedCls = 'bg-inherit hover:bg-inherit';
  const boomCls = 'bg-red-500/50 hover:bg-red-500/100';

  const cls = cn(baseCls, isActived ? activedCls : inactivedCls, isBoom && boomCls);

  return cls;
}

const Block = (props: BlockProps) => {
  const { tipsNum, hasMine, isCovered, isFlagged, devMode, ...rest } = props;
  const { status } = useSnapshot(MineSweeper.state);
  const isBoom = status === 'lost' && hasMine;

  return (
    <>
      <Button
        variant='ghost'
        className={transformCls({ isActived: !isCovered, isBoom })}
        {...rest}
        //
      >
        {tipsNum < 0 ? <Bomb devMode={devMode} /> : <DyncNumber devMode={devMode} isCovered={isCovered} number={tipsNum} />}
      </Button>
    </>
  );
};

export default Block;