import type { ReactNode } from 'react';
import { GitHubLogoIcon, JikeIcon } from '../../Icons';

// Icon Patch
export const mediaNameMap: Record<string, { name: string; icon?: ReactNode }> = {
  'www.github.com': {
    name: 'Github',
    icon: <GitHubLogoIcon className='w-6 h-6' />,
  },
  'web.okjike.com': {
    name: '即刻',
    icon: <JikeIcon className='w-6 h-6' />,
  },
  'www.douban.com': {
    name: '豆瓣',
    // icon: undefined,
  },

  'www.zhihu.com': {
    name: '知乎',
    // icon: undefined,
  },
  'www.bilibili.com': {
    name: '哔哩哔哩',
    // icon: undefined,
  },
};
