import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react({ jsxRuntime: 'classic' }), tailwindcss()],
  base: '/mpegts-vue3/react/',
})
