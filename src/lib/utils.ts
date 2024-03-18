import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { GameState, Position } from '@/type';

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

export function getFlatPosi({ p, w }: { p: Position; w: GameState['w'] }) {
  return p.x + p.y * w;
}
