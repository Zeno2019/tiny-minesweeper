
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
  checkBlock(...args: any[]): void;
}

export interface GameState {
  status: CurrGameStatus;
  w: MatrixShape['w'];
  h: MatrixShape['h'];
  startTime: number;
  currentTime: number;
  minePlaced: boolean;
  devMode: boolean;
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
  isFlagged: boolean;
  isDoubted?: boolean;
  key?: string;
};
