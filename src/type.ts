import { DateTime } from 'luxon';

// out of game
// export type DATE_FORMATS = 'yyyy-MM-dd' | 'yyyy-MM-dd HH:mm:ss';

export type GameExperienceState = {
  isDevMode: boolean;
  isDarkMode: boolean;
};

// back to game
// TODO: 后续可添加暂停状态
export type CurrGameStatus = 'won' | 'lost' | 'playing';

export type MatrixShape = {
  w: number;
  h: number;
};

export interface GameBase {
  checkGameStatus(...args: any[]): void;
}

export interface GameState {
  status: CurrGameStatus;
  w: MatrixShape['w'];
  h: MatrixShape['h'];
  startTime: typeof DateTime | number | null;
  endTime: typeof DateTime | number | null;
  minePlaced: boolean;
  minesTotal: number;
  board: BlockType[]; // flatten the matrix array
}

export type Position = {
  x: number;
  y: number;
};

export type BlockType = {
  x: Position['x'];
  y: Position['y'];
  tipsNum: number;
  hasMine: boolean;
  isCovered: boolean;
  flagged?: boolean;
  isDoubted?: boolean;
  key?: string;
};
