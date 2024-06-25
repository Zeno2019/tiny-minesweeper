# Tiny Minesweeper

## 项目简介 / Project Introduction

Tiny Minesweeper 是扫雷游戏基于 React 的简单实现，旨在提供具有一定挑战性的游戏体验。你可以通过以下链接试玩这个游戏：

- 主链接 / Main Link: 👉 [Play](https://tiny-minesweeper.zeabur.app/)
- 副链接 / Secondary Link: 👉 [Play](https://tiny-minesweeper.netlify.app/)

## 玩法介绍 / How to Play

### 中文

1. 游戏开始时，游戏板上会有一些隐藏的地雷。
2. 点击任意方块以揭开它。如果你点击到地雷，游戏结束。
3. 如果你揭开的方块没有地雷，它会显示一个数字，表示周围八个方块中有多少个地雷。
4. 根据这些数字，推理出哪些方块可能有地雷，并标记它们。
5. 右键点击方块可以标记为地雷，再次右键点击可以取消标记。
6. 当你成功揭开所有没有地雷的方块时，你赢得游戏。

#### 补充说明 / Additional Notes

1. 目前移动端的响应式视图只适配了 easy 难度。
2. 移动端标记雷需要长按。

### English

1. At the start of the game, there are some hidden mines on the game board.
2. Click any tile to reveal it. If you click on a mine, the game is over.
3. If the revealed tile does not contain a mine, it will display a number indicating how many mines are in the surrounding eight tiles.
4. Use these numbers to deduce which tiles might contain mines and mark them.
5. Right-click a tile to mark it as a mine, and right-click again to unmark it.
6. You win the game when you successfully reveal all tiles that do not contain mines.

#### Additional Notes

1. Currently, the responsive view on mobile devices only supports the easy difficulty.
2. To mark a mine on mobile devices, you need to long press.

## 代码结构 / Code Structure

- `src/`: 源代码目录，包括主要的 React 组件和布局文件。
  - `App.tsx`: 应用的主入口文件，包含主要的游戏组件[1](https://github.com/Zeno2019/tiny-minesweeper/blob/master/src/App.tsx)。
  - `components/`: 组件目录，包含游戏的各个 UI 组件。
  - `logic/`: 游戏逻辑目录，包含游戏的核心逻辑实现。
  - `utils/`: 工具目录，包含辅助函数和工具类。

## 本地启动 / Local Setup

### 安装依赖 / Install Dependencies

```bash
pnpm install
```

### 启动开发服务器 / Start Development Server

```bash
pnpm dev
```

## 致谢 / Acknowledgements

感谢 [Simon-He95/minesweeper](https://github.com/Simon-He95/minesweeper) 项目对本项目的启发和帮助。
