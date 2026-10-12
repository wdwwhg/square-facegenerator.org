import type { AvatarOptions } from '@/lib/pixel-tools';

export const avatarEntries = {
  icon: {
    path: '/square-face-icon-generator',
    keyword: 'Square Face Icon Generator',
    preset: {
      skin: '#c58e64',
      hair: '#253e55',
      shirt: '#31556c',
      background: '#cadfe9',
      hairstyle: 0,
      expression: 0,
      eyewear: 1,
    },
  },
  pfp: {
    path: '/pfp-maker',
    keyword: 'PFP Maker',
    preset: {
      skin: '#e4b48e',
      hair: '#b95864',
      shirt: '#9c5fc2',
      background: '#ead5d9',
      hairstyle: 5,
      expression: 4,
    },
  },
  square: {
    path: '/square-pfp',
    keyword: 'Square PFP',
    preset: {
      skin: '#d8a077',
      hair: '#151b24',
      shirt: '#5e8acb',
      background: '#ffffff',
      hairstyle: 10,
      expression: 3,
    },
  },
  random: {
    path: '/square-pfp-generator',
    keyword: 'Square PFP Generator',
    preset: {
      skin: '#f0c7a5',
      hair: '#9c5fc2',
      shirt: '#537f69',
      background: '#f5d583',
      hairstyle: 7,
      expression: 1,
    },
  },
  pixel: {
    path: '/pixel-art-generator',
    keyword: 'Pixel Art Generator',
    preset: {
      skin: '#bb7f59',
      hair: '#5e8acb',
      shirt: '#182b43',
      background: 'transparent',
      hairstyle: 2,
      expression: 3,
      eyewear: 4,
    },
  },
} satisfies Record<
  string,
  { path: string; keyword: string; preset: Partial<AvatarOptions> }
>;

export type AvatarEntryKind = keyof typeof avatarEntries;
