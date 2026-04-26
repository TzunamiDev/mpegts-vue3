import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts'],
  format: ['esm', 'cjs'],
  platform: 'neutral',
  clean: true,
  deps: {
    neverBundle: ['react', 'react-dom', 'mpegts.js'],
  },
})
