import type { ReactNode } from 'react';
import { GitHubLogoIcon, JikeIcon } from '../../Icons';

// Icon Patch
export const mediaNameMap: Record<string, { name: string; icon?: ReactNode }> = {
  'github': {
    name: 'Github',
    icon: <GitHubLogoIcon className='w-6 h-6' />,
  },
  'okjike': {
    name: '即刻',
    icon: <JikeIcon className='w-6 h-6' />,
  },
  'douban': {
    name: '豆瓣',
    // icon: undefined,
  },

  'zhihu': {
    name: '知乎',
    // icon: undefined,
  },
  'bilibili': {
    name: '哔哩哔哩',
    // icon: undefined,
  },
};

export function mappingSocial(domain: string): { name: string; icon?: ReactNode } | undefined {
  const domainParts = domain.split('.');
  const mainPart = domainParts.length > 1 ? domainParts[domainParts.length - 2] : domain;

  const keys = Object.keys(mediaNameMap);
  for (const key of keys) {
    if (mainPart.includes(key)) {
      return mediaNameMap[key];
    }
  }

  return undefined;
}
