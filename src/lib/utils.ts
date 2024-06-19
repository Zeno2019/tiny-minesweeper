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
  const target = e?.target as HTMLElement | null;
  if (!target) throw new Error('target is null');

  const x = target.getAttribute('data-x');
  const y = target.getAttribute('data-y');

  // if (x === null || y === null) throw new Error('x or y is null');
  if (x === null || y === null) return false;

  return true;
}

export function isInBoard(p: Position, w: GameState['w'], h: GameState['h']) {
  return p.x >= 0 && p.y >= 0 && p.x < w && p.y < h;
}

export function _setInterval({ cb, cancelCb, interval = 1000 }: { cb: Function; cancelCb?: () => boolean; interval?: number }) {
  let timer: number | null = null;
  let expectedTime = Date.now() + interval;

  const fn = () => {
    const drift = Date.now() - expectedTime; // 计算偏移量
    if (drift >= 0) {
      cb();
      expectedTime += interval;
    }

    if (!cancelCb || !cancelCb()) {
      timer = requestAnimationFrame(fn);
    } else {
      if (timer !== null) {
        cancelAnimationFrame(timer);
      }
    }
  };

  // 初始化调用
  timer = requestAnimationFrame(fn);

  return () => {
    if (timer !== null) {
      cancelAnimationFrame(timer);
    }
  };
}
