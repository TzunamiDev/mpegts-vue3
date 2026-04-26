# Plan: 新增 mpegts-react 包

## 目标
在现有 pnpm monorepo 中新增 `packages/react-player`，实现 React 17+ 版本的 mpegts.js 播放器组件，与 Vue 3 版本保持一致的 Props API。

## 架构
独立 React 包，用 tsdown 打包，不依赖 Vue 包。类型直接从 mpegts.js alias。CI 同时发布两个包。

## 文件结构

```
packages/react-player/
├── src/
│   ├── index.ts              # 导出
│   ├── types.ts              # PlayerStatus 类型 + mpegts.js 类型 alias
│   └── MpegtsPlayer.tsx       # React 组件
├── package.json
├── tsconfig.json
└── tsdown.config.ts
```

## 任务步骤

### Task 1: 创建 packages/react-player 脚手架
- 创建 `packages/react-player/package.json`（name: mpegts-react，peerDeps: react@^17.0.0, mpegts.js@^1.8.0）
- 创建 `packages/react-player/tsconfig.json`（extends root，jsx: react-jsx）
- 创建 `packages/react-player/tsdown.config.ts`（ESM + CJS，neverBundle react + mpegts.js）
- 创建 `packages/react-player/src/types.ts`（alias mpegts.js 类型 + PlayerStatus）

### Task 2: 实现 MpegtsPlayer React 组件
- 创建 `packages/react-player/src/MpegtsPlayer.tsx`
  - forwardRef + useImperativeHandle 暴露 play()/pause()
  - useRef<HTMLVideoElement> + useRef<Mpegts.Player>
  - useState<PlayerStatus> 管理状态
  - useEffect 管理 mount/unmount（创建/销毁播放器）
  - useEffect 监听 url 变化重建播放器
  - useEffect 监听 config/mediaDataSource props 变化重建播放器
  - Props 接口与 Vue 版本一致：url, autoplay, isLive, muted, type, cors, withCredentials, hasAudio, hasVideo, duration, filesize, config
  - Events: onStatus, onError
  - 覆盖层 UI：nosignal/connecting/error 状态（使用 inline style 而非 Tailwind，React 版本不依赖 Tailwind）

### Task 3: 创建 index.ts 导出
- 导出 MpegtsPlayer 组件 + 所有类型

### Task 4: 安装依赖并验证构建
- pnpm install
- 构建 react-player 包
- 确认 dist/ 输出正确

### Task 5: 更新 GitHub Actions publish.yml
- 同时构建并发布两个包（player + react-player）

### Task 6: 更新 README
- 添加 React 版本的使用说明

### Task 7: 最终验证 + 提交
- pnpm build 全量构建
- git commit
