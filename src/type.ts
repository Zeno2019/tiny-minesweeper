// out of game
export type GameExperienceState = {
  isDevMode: boolean;
  isDarkMode: boolean;
};

// back to game
export type CurrGameStatus = 'won' | 'lost' | 'playing';

export type MatrixShape = {
  w: number;
  h: number;
};

export interface GameState {
  status: CurrGameStatus;
  w: MatrixShape['w'];
  h: MatrixShape['h'];
  startTime: number | typeof Date; // timeStamp ?
  endTime: number | typeof Date; // timeStamp ?
  minePlaced: boolean;
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
  flagged: boolean;
  isDoubted?: boolean;
  key?: string;
};
