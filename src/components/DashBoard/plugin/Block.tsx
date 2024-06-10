import { BombIcon } from '@/Icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BlockType } from '@/type';

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

function transformCls(isActived: boolean) {
  const baseCls = 'h-8 w-8 flex place-items-center m-[0.5px] rounded-[2px] border-indigo-300 border-[0.5px]';
  const inactivedCls = 'bg-indigo-200 hover:bg-indigo-100';
  const activedCls = 'bg-inherit hover:bg-inherit';

  const cls = cn(baseCls, isActived ? activedCls : inactivedCls);

  return cls;
}

const Bomb = (props: any) => {
  const { devMode } = props;

  return devMode && <BombIcon className='w-5 h-5 absolute pointer-events-none' />;
};

const TipsNum = (props: any) => {
  const { tipsNum, isCovered, devMode } = props;

  const devEl = <p className='text-sm pointer-events-none'>{isCovered ? tipsNum : tipsNum > 0 ? tipsNum : null}</p>;
  const normalEl = <p className='text-sm pointer-events-none'>{!isCovered && tipsNum > 0 ? tipsNum : null}</p>;

  return devMode ? devEl : normalEl;
};

const Block = (props: BlockProps) => {
  const { tipsNum, hasMine, isCovered, isFlagged, devMode, ...rest } = props;

  return (
    <>
      <Button
        variant='ghost'
        className={transformCls(!isCovered)}
        {...rest}
        //
      >
        {tipsNum < 0 ? <Bomb devMode={devMode} /> : <TipsNum devMode={devMode} isCovered={isCovered} tipsNum={tipsNum} />}
      </Button>
    </>
  );
};

export default Block;
