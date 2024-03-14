import { Button } from '@/components/ui/button';

const Block = (props) => {
  const { markVal } = props;

  return (
    <Button variant='ghost' className='h-8 w-8 flex place-items-center m-[1px] bg-indigo-200 rounded-[2px]'>
      {markVal}
    </Button>
  );
};

export default Block;
