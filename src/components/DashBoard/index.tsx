import Block from './plugin/Block';

export default function DashBoard(props) {
  const NUM = 9;

  const Cols = new Array(NUM).fill(0);
  const Rows = new Array(NUM).fill(Cols);

  // console.table(Rows)

  return (
    <div className='grid place-items-center min-h-[16rem]'>
      {Rows.map((col, rowIdx) => {
        return (
          <div key={`row-${rowIdx}`} className={'flex'}>
            {col?.map((block, colIdx) => {
              return <Block key={`col-${colIdx}`} markVal={block} />;
            })}
          </div>
        );
      })}
    </div>
  );
}
