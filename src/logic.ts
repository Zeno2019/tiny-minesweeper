import { proxy, snapshot, subscribe } from 'valtio';

export class GameInstance {
  constructor(w, h) {
    this.state = proxy({
      board: [],
    });

    this.history = new Map(); // 记录快照
    this.currStep = 0;

    this.initBoard(w, h);
  }

  initBoard(w, h) {
    this.state.board = Array.from({ length: w * h }, (_, idx) => {
      // game logic...
    });

    this.saveSnapshot(); // 初始化后进行保存
  }

  // 保存当前快照
  saveSnapshot() {
    const currSnapshot = snapshot(this.state);
    this.history.set(++this.currStep, currSnapshot);
  }

  revertToSnapshot(step) {
    const targetSnapshot = this.history.get(step);

    if (targetSnapshot) {
      // 从快照中恢复数据, 注意：这里的数据是 valtio 的代理对象，而且开始时间和结束时间（如果有的话）是旧版本



    }
  }
}
