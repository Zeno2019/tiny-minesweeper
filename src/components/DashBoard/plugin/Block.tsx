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
  const baseCls = 'h-8 w-8 flex place-items-center m-[1px] hover:bg-inherit rounded-[2px]';
  const inactivedCls = 'bg-indigo-200';
  const activedCls = 'bg-inherit';

  const cls = cn(baseCls, isActived ? activedCls : inactivedCls);

  return cls;
}

const Block = (props: BlockProps) => {
  const { tipsNum, hasMine, isCovered, onClick, ...rest } = props;

  return (
    <Button variant='ghost' className={transformCls(!isCovered)} onClick={onClick} {...rest}>
      {tipsNum}
    </Button>
  );
};

export default Block;
