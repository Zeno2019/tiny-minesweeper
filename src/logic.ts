import { proxy, snapshot, subscribe } from 'valtio';
import { proxyWithHistory } from 'valtio-history';
import { genUUID, getFlatPosi, isInBoard, isValidSize } from './lib/utils';
import { BlockType, GameBase, GameState, Position } from './type';
import { DateTime } from 'luxon';
import { watch } from 'valtio/utils';
import { fromEvent } from 'rxjs';

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

// 八方向坐标运算
const directions = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
];

export class GameInstance implements GameBase {
  state: GameState;
  history: Map<number, GameState>;
  currStep: number;

  constructor(w = 9, h = 9) {
    const { value } = proxyWithHistory<GameState>({
      status: 'playing',
      w,
      h,
      board: [],
      startTime: DateTime.now().toUnixInteger(),
      endTime: null,
      minePlaced: false,
    });

    this.state = value;
    this.history = new Map<number, GameState>(); // 记录快照
    this.currStep = 0;

    this.initBoard(this.state.w, this.state.h);
    this.initWatcher();
  }

  initBoard(w = this.state.w, h = this.state.h) {
    if (!isValidSize({ w, h })) throw new Error('invalid size');

    const board = Array.from({ length: w * h }, (_, idx) => {
      // 计算当前块的 x 和 y 坐标
      const x = idx % w;

      // 当前 block 下标除以行宽度, 向下取整
      const y = Math.floor(idx / w);

      return createBlock({ x, y });
    });

    this.state.board = board;
    console.info('board', board);

    // 初始化后进行保存
    // this.saveSnapshot();

    return this;
  }

  initWatcher() {
    console.info('init watcher...');

    // Data Watcher
    watch((get) => {
      const board = get(this.state).board;

      // 这里可以根据board的变化执行相应的逻辑
      // 例如, 检查游戏状态、更新UI等
      console.info('Board has changed', board);
    });
  }

  // 处理游戏逻辑的入口
  // 这里其实可以用 key, 但是抽象成矩阵的设计思路, 让我倾向于这里用坐标
  checkGameStatus({ x, y }: Position): void {
    if (this.state.status === 'lost') {
      console.info('you lose');
      return;
    }

    if (this.state.status === 'won') {
      console.info('you won');
      return;
    }

    if (this.state.status === 'playing') {
      // saveSnapshot or do nothing ...
      ++this.currStep;

      // Just First Step
      if (!this.state.minePlaced) {
        this.placeMine(this.state.board, { x, y });
        return;
      }

      // normal step
    }
  }

  // place the mine
  placeMine(currBoard: BlockType[], firstPosition: Position) {
    this.state.minePlaced = true;

    const sibilings = this.getSiblingsIdx(firstPosition);
    console.info('sibilings', sibilings);

    // 获取第一个 block 位置, 调用其九宫格的处理逻辑, 当前格必定不为雷, 但同时需要在周围放完雷, 有了 tipsNum 之后, 再展开当前格子
  }

  discoverBlock({ x, y }: Position) {
    const idx = getFlatPosi({ p: { x, y }, w: this.state.w });
    const block = this.state.board[idx];
  }

  // 获取当前 block 的 8 个相邻 block 索引
  getSiblingsIdx({ x, y }: Position) {
    const res = directions
      .map(([dx, dy]) => {
        const currX = x + dx;
        const currY = y + dy;

        // 进行边界判断，防止因为数组一维化后导致的越界 bug
        if (isInBoard({ x: currX, y: currY }, this.state.w, this.state.h)) {
          const posiIdx = getFlatPosi({ p: { x: currX, y: currY }, w: this.state.w });

          return posiIdx;
        }
      })
      .filter(Boolean) as number[];

    return res;
  }

  // TODO: snapShot 功能暂不开放, 注意：这里的数据是 valtio 的代理对象, 可能会有一些待解决的问题

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
