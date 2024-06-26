import { proxyWithHistory } from 'valtio-history';
import { genUUID, getFlatPosi, isInBoard, isValidSize, getMinesTotal } from './lib/utils';
import { BlockType, GameBase, GameState, Position, MatrixShape } from './type';
import { DateTime } from 'luxon';

function createBlock({ x, y }: Position): BlockType {
  return {
    key: genUUID(),
    x,
    y,
    tipsNum: 0,
    hasMine: false,
    isCovered: true,
    isFlagged: false,
  };
}

function createBoard({ w, h }: MatrixShape) {
  if (!isValidSize({ w, h })) throw new Error('invalid size');

  const board = Array.from({ length: w * h }, (_, idx) => {
    // 计算当前块的 x 和 y 坐标
    const x = idx % w;

    // 当前 block 下标除以行宽度, 向下取整
    const y = Math.floor(idx / w);

    return createBlock({ x, y });
  });

  return board;
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

let MineSweeper: GameInstance;

export class GameInstance implements GameBase {
  state: GameState;
  history: Map<number, GameState>;
  currStep: number;

  constructor(w = 9, h = 9) {
    const s = this.generateState({ w, h });
    const { value } = proxyWithHistory<GameState>(s);

    this.state = value;
    this.currStep = 0;
    this.history = new Map<number, GameState>(); // 记录快照
  }

  generateState({ w, h }: MatrixShape) {
    if (!isValidSize({ w, h })) throw new Error('invalid size');

    return {
      status: 'playing',
      w,
      h,
      board: createBoard({ w, h }),
      startTime: 0,
      currentTime: 0,
      devMode: false,
      minePlaced: false,
      minesTotal: getMinesTotal({ w, h }),
    } as GameState;
  }

  reset({ w, h }: MatrixShape) {
    if (!isValidSize({ w, h })) throw new Error('invalid size');
    const s = this.generateState({ w, h });

    Object.keys(s).forEach((key) => {
      if (key in this.state) {
        (this.state as any)[key as keyof GameState] = s[key as keyof GameState];
      }
    });

    this.currStep = 0;
  }

  // 这里其实可以用 key, 但是抽象成矩阵的设计思路, 让我倾向于这里用坐标
  checkBlock(position: Position) {
    if (this.state.status !== 'playing') return;

    // Just First Step
    if (!this.state.minePlaced) {
      const firstPosition = position;
      const size = { w: this.state.w, h: this.state.h };

      // 放雷并标识雷数目
      this.placeMines(this.state.board, size, firstPosition);

      // 开始计时
      this.state.startTime = DateTime.now().toUnixInteger();

      ++this.currStep;

      return;
    }

    // normal step
    const idx = getFlatPosi({ p: position, w: this.state.w });
    const block = this.state.board?.[idx];

    // 💣 boom...
    if (block.hasMine) {
      this.state.status = 'lost';
      ++this.currStep;
      // this.checkBlock(position);

      return;
    }

    // 🤔 continue...
    if (block.isCovered) {
      this.discoverBlock(position);
      ++this.currStep;

      // 🥇 yeah!
      if (this.isFulfillWinConditions()) {
        this.state.status = 'won';
      }

      // this.checkBlock(position);

      return;
    }
  }

  // 判断是否满足胜利条件
  isFulfillWinConditions() {
    const board = this.state.board;
    const total = getMinesTotal({ w: this.state.w, h: this.state.h });

    // 1. 全部标记正确(最终还是要揭开来进行验证，此条件不正确)
    // 2. 剩下未被揭开的 block 数目跟雷数目相等
    const stillCoveredBlocks = board?.filter((b) => b.isCovered);
    const isFulfilled = stillCoveredBlocks?.length === total;

    return isFulfilled;
  }

  // place the mines
  placeMines(board: BlockType[], size: MatrixShape, firstPosition: Position) {
    this.state.minePlaced = true;

    const firstClkIdx = getFlatPosi({ p: firstPosition, w: size.w });
    // const exclude = new Set([firstClkIdx]); // 避免重复放雷，最终包括首次点击的格子，合计 11 个排除项

    const excludeIdx = firstClkIdx;

    try {
      const minesTotal = getMinesTotal(size);
      let minesPlaced = 0;

      while (minesPlaced < minesTotal) {
        let randomIndex = Math.floor(Math.random() * board.length);

        if (randomIndex !== excludeIdx && !board[randomIndex].hasMine) {
          const block = board[randomIndex];
          block.hasMine = true;
          block.tipsNum = -(minesTotal + 1);

          const sibilings = this.getSiblingsIdx({
            x: block.x,
            y: block.y,
          });

          this.updateTipsNum(board, sibilings);

          ++minesPlaced;
        }
      }

      // 首次点击必定不为雷, 但同时需要在全局放完雷, 有了 tipsNum 之后, 再揭开当前格子
      this.discoverBlock(firstPosition);

      console.info('generated mines done');
    } catch (err) {
      console.error('generated mines error', err);
    }
  }

  // 递归揭开 block
  discoverBlock({ x, y }: Position) {
    const idx = getFlatPosi({ p: { x, y }, w: this.state.w });
    const block = this.state.board?.[idx];

    if (block && block.isCovered && !block.isFlagged) {
      block.isCovered = false;

      if (block.tipsNum === 0) {
        const sibilings = this.getSiblingsIdx({ x, y });

        sibilings.forEach((i) => {
          const sBlock = this.state.board?.[i];

          if (sBlock.tipsNum > 0) {
            sBlock.isCovered = false;
            return;
          }

          if (sBlock.tipsNum === 0) {
            this.discoverBlock({ x: sBlock.x, y: sBlock.y });
            return;
          }
        });
      }
    }
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
      .filter((idx) => idx !== undefined && idx >= 0) as number[];

    return res;
  }

  // 更新每个传入的 index 对应的 block 的 tipsNum
  updateTipsNum(board: BlockType[], sibilings: number[]) {
    sibilings.forEach((idx) => ++board[idx].tipsNum);
  }

  toggleDevMode() {
    this.state.devMode = !this.state.devMode;
  }

  toggleFlag({ x, y }: Position) {
    const idx = getFlatPosi({ p: { x, y }, w: this.state.w });
    const block = this.state.board?.[idx];
    const { minesTotal } = this.state;

    if (block && block.isCovered) {
      if (minesTotal <= 0 && !block.isFlagged) {
        console.error('flag should not exceed mines total!');

        return;
      }

      if (block.isFlagged) {
        block.isFlagged = false;
        this.state.minesTotal += 1;

        return;
      }

      if (!block.isFlagged) {
        block.isFlagged = true;
        this.state.minesTotal -= 1;

        return;
      }
    }
  }

  // 更新时间
  updateTime(t: GameState['currentTime']) {
    if (!this.state.startTime) {
      this.state.startTime = t;
    }

    this.state.currentTime = t;
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

MineSweeper = new GameInstance();

export { MineSweeper };
