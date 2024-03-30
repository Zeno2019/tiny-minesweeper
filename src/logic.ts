import { proxy, snapshot, subscribe } from 'valtio';
import { proxyWithHistory } from 'valtio/utils';
import { genUUID, isValidSize } from './lib/utils';
import { BlockType, CurrGameStatus, GameBase, GameState, Position } from './type';
import { DateTime } from 'luxon';

function createBlock({ x, y }: Position): BlockType {
  return {
    key: genUUID(),
    x,
    y,
    tipsNum: 0,
    hasMine: false,
    isCovered: true,
    flagged: false,
  };
}

export class GameInstance implements GameBase {
  state: GameState;
  history: Map<number, GameState>;
  currStep: number;

  constructor() {
    this.state = proxy<GameState>({
      status: 'playing',
      w: 9,
      h: 9,
      board: [],
      startTime: DateTime.now().toUnixInteger(),
      endTime: null,
      minePlaced: false,
    });

    this.history = new Map<number, GameState>(); // 记录快照
    this.currStep = 0;

    this.initBoard(this.state.w, this.state.h);
  }

  initBoard(w = this.state.w, h = this.state.h) {

    if (!isValidSize({ w, h })) throw new Error('invalid size');

    const board = Array.from({ length: w * h }, (_, idx) => {
      // 计算当前块的 x 和 y 坐标
      const x = idx % w;

      // 当前 block 下标除以行宽度，向下取整
      const y = Math.floor(idx / w);

      return createBlock({ x, y });
    });

    this.state.board = board;
    // 初始化后进行保存
    // this.saveSnapshot();

    return this
  }

  checkGameStatus(): void {
    if (this.state.status === 'lost') {
      alert('you lose');
      return
    }

    if (this.state.status === 'won') {
      alert('you won');
      return
    }

    if (this.state.status === 'playing') {
      // saveSnapshot or do nothing ...
      ++this.currStep;
    }

  }

  // TODO: snapShot 功能暂不开放，注意：这里的数据是 valtio 的代理对象，可能会有一些待解决的问题

  // 保存当前快照
  // saveSnapshot() {
  //   const currSnapshot = snapshot(this.state);
  //   this.history.set(++this.currStep, currSnapshot);
  // }

  // revertToSnapshot(step: number) {
  //   const targetSnapshot = this.history.get(step);

  //   if (targetSnapshot) {
  //     //
  //   }
  // }

}
