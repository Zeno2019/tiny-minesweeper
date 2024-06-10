import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { GameState, MatrixShape, Position } from '@/type';

/**
 * Combines multiple class names into a single string.
 *
 * @param {ClassValue[]} inputs - An array of class values to be combined.
 * @return {string} The combined class names as a single string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Generate a unique identifier using the crypto.randomUUID() method.
 *
 * @return {string} A randomly generated UUID.
 */
export function genUUID(): string {
  return crypto.randomUUID();
}

// About Game Logic
export function getFlatPosi({ p, w }: { p: Position; w: GameState['w'] }) {
  return p.x + p.y * w;
}
export function isValidSize(size: MatrixShape) {
  const { w, h } = size;

  const isValidWidth = [9, 16, 30].includes(w);
  const isValidHeight = [9, 16].includes(h);

  return isValidWidth && isValidHeight && w >= h;
}

export function getMinesTotal(size: MatrixShape) {
  if (!isValidSize(size)) throw new Error('invalid size!');

  const totalsEnum = {
    '9x9': 10,
    '16x16': 40,
    '30x16': 99,
  } as any;

  return totalsEnum[`${size.w}x${size.h}`];
}

export function isLeagalGameEl(e: MouseEvent | TouchEvent) {
  console.info('isLeagalGameEl', e);

  const target = e?.target as HTMLElement | null;
  if (!target) throw new Error('target is null');

  const x = target.getAttribute('data-x');
  const y = target.getAttribute('data-y');

  // if (x === null || y === null) throw new Error('x or y is null');
  if (x === null || y === null) return false;

  return true;
}

// export function generateMines(board: GameState['board'], size: MatrixShape, firstPosition: Position) {
//   const firstClkIdx = getFlatPosi({ p: firstPosition, w: size.w });
//   const exclude = new Set([firstClkIdx]);

//   try {
//     const minesTotal = getMinesTotal(size);
//     let minesPlaced = 0;

//     while (minesPlaced < minesTotal) {
//       let randomIndex = Math.floor(Math.random() * board.length);

//       if (!exclude.has(randomIndex) && !board[randomIndex].hasMine) {
//         board[randomIndex].hasMine = true;
//         exclude.add(randomIndex);
//         minesPlaced++;
//       }
//     }

//     console.info('generated mines done', { minesPlaced, minesTotal, exclude });
//   } catch (err) {
//     console.error('generated mines error', err);
//   }
// }

export function isInBoard(p: Position, w: GameState['w'], h: GameState['h']) {
  return p.x >= 0 && p.y >= 0 && p.x < w && p.y < h;
}
