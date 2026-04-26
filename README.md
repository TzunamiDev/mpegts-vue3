# mpegts-vue3 / mpegts-react

Vue 3 and React components for [mpegts.js](https://github.com/xqq/mpegts.js) video streaming player. Supports FLV live streams over HTTP/WebSocket with low-latency playback.

This monorepo contains two packages:

- **`mpegts-vue3`** — Vue 3 component (Tailwind CSS)
- **`mpegts-react`** — React 17+ component (inline styles, zero CSS dependency)

## Features

- Full TypeScript support
- Low-latency live stream playback optimized via mpegts.js MSE
- Auto-play with muted fallback
- Status overlay states: connecting, playing, error, no signal
- Exposed `play()` / `pause()` methods for programmatic control
- ESM + CJS dual format with type declarations
- Transparent `MediaDataSource` and `Config` props passthrough

---

## Vue 3 (`mpegts-vue3`)

### Install

```bash
pnpm add mpegts-vue3 mpegts.js
```

`mpegts.js` and `vue` are peer dependencies and must be installed separately.

### Usage

```vue
<script setup lang="ts">
import { MpegtsPlayer } from 'mpegts-vue3'
import type { PlayerStatus } from 'mpegts-vue3'
</script>

<template>
  <MpegtsPlayer
    url="ws://host:port/live/stream.flv"
    :autoplay="true"
    :is-live="true"
    :muted="true"
    @status="(s: PlayerStatus) => console.log(s)"
    @error="(type, detail, info) => console.error(type, detail)"
  />
</template>
```

### Tailwind CSS

The Vue 3 component uses Tailwind CSS utility classes. If your project uses Tailwind CSS v4, add:

```css
@import 'tailwindcss';
@source 'node_modules/mpegts-vue3/dist/**/*.js';
```

---

## React (`mpegts-react`)

### Install

```bash
pnpm add mpegts-react mpegts.js
```

`mpegts.js` and `react` are peer dependencies and must be installed separately.

### Usage

```tsx
import { MpegtsPlayer } from 'mpegts-react'
import type { PlayerStatus } from 'mpegts-react'

function App() {
  const ref = useRef<MpegtsPlayerRef>(null)

  return (
    <MpegtsPlayer
      ref={ref}
      url="ws://host:port/live/stream.flv"
      autoplay={true}
      isLive={true}
      muted={true}
      onStatus={(s: PlayerStatus) => console.log(s)}
      onError={(type, detail, info) => console.error(type, detail)}
    />
  )
}
```

The React component uses inline styles with zero CSS dependencies.

---

## Shared Props API

Both Vue 3 and React components share the same props interface:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `url` | `string` | — | Stream URL (required, same as mpegts.js `MediaDataSource.url`) |
| `autoplay` | `boolean` | `true` | Auto-play on mount |
| `isLive` | `boolean` | `true` | Live stream mode |
| `muted` | `boolean` | `true` | Muted playback |
| `type` | `string` | `'mse'` | Media type: `'mse'`, `'mpegts'`, `'m2ts'`, `'flv'`, `'mp4'` |
| `cors` | `boolean` | — | Enable CORS for HTTP fetching |
| `withCredentials` | `boolean` | — | HTTP fetching with cookies |
| `hasAudio` | `boolean` | — | Whether stream has audio track |
| `hasVideo` | `boolean` | — | Whether stream has video track |
| `duration` | `number` | — | Total media duration in milliseconds |
| `filesize` | `number` | — | Total file size in bytes |
| `config` | `Partial<MpegtsConfig>` | `{}` | mpegts.js player config. See [mpegts.js API](https://github.com/xqq/mpegts.js/blob/master/docs/api.md) |

### Events / Callbacks

| Event | Payload | Description |
|-------|---------|-------------|
| `onStatus` / `@status` | `(status: PlayerStatus)` | Status change |
| `onError` / `@error` | `(errorType, errorDetail, errorInfo)` | Playback error |

### Ref Methods

| Method | Description |
|--------|-------------|
| `play()` | Resume playback |
| `pause()` | Pause playback |

### PlayerStatus Type

```ts
type PlayerStatus =
  | 'connecting'  // Connecting to stream
  | 'destroying'  // Destroying player instance
  | 'error'       // Playback error
  | 'nosignal'    // No signal / no url
  | 'playing'     // Playing
  | 'stopped'     // Paused / stopped
```

## Demo

A live Vue 3 demo is available at [GitHub Pages](https://your-username.github.io/mpegts-vue3/).

To run locally:

```bash
pnpm install
pnpm dev
```

## Development

```bash
pnpm install

# Build Vue 3 package
pnpm -C packages/player build

# Build React package
pnpm -C packages/react-player build

# Build demo
pnpm -C apps/demo build

# Run demo dev server
pnpm dev
```

## Publishing

Both packages are published automatically via GitHub Actions when a version tag is pushed:

```bash
git tag v0.1.0
git push origin v0.1.0
```

Manual publish is also available via the `Publish to npm` workflow with options to publish all, `mpegts-vue3` only, or `mpegts-react` only.

## Tech Stack

- [Vue 3](https://vuejs.org/) + [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [mpegts.js](https://github.com/xqq/mpegts.js) — FLV over HTTP/WebSocket playback
- [tsdown](https://tsdown.dev/) — Library bundler powered by Rolldown
- [Tailwind CSS v4](https://tailwindcss.com/) — Vue component styling
- [antdv-next](https://antdv-next.com/) + [lucide-vue-next](https://lucide.dev/) — Demo UI

## License

MIT
