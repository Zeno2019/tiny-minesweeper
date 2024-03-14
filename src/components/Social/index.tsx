import { Button } from '@/components/ui/button';
import { mediaNameMap } from './SocialConfig';

interface IProps {
  url: keyof typeof mediaNameMap;
  user: string;
}

export default function Social({ url, user }: IProps) {
  const { name: urlName, icon } = mediaNameMap[url];

  return (
    <a target='_blank' href={`https://${url}/${user}`}>
      <Button variant='ghost' className='flex bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-900'>
        <span>{icon}</span>
        <span className='ml-2'>{urlName}</span>
      </Button>
    </a>
  );
}
