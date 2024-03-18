import { Button } from '@/components/ui/button';

export type BlockProps = {
  tipsNum: number;
  onClick?: () => void;
};

const Block = (props: BlockProps) => {
  const { tipsNum, onClick } = props;

  return (
    <Button variant='ghost' className='h-8 w-8 flex place-items-center m-[1px] bg-indigo-200 rounded-[2px]' onClick={onClick}>
      {tipsNum}
    </Button>
  );
};

export default Block;
