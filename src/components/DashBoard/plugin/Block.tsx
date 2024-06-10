import { BombIcon } from '@/Icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BlockType } from '@/type';

export interface BlockProps {
  tipsNum: BlockType['tipsNum'];
  hasMine: BlockType['hasMine'];
  isCovered: BlockType['isCovered'];
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
  return <BombIcon className='w-5 h-5 absolute pointer-events-none' />;
};

const Block = (props: BlockProps) => {
  const { tipsNum, hasMine, isCovered, onClick, ...rest } = props;

  return (
    <>
      <Button variant='ghost' className={transformCls(!isCovered)} onClick={onClick} {...rest}>
        {tipsNum < 0 ? <Bomb /> : tipsNum}
      </Button>
      {/* <div className='border-indigo-100 border-[0.5px]'>111</div> */}
    </>
  );
};

export default Block;
