import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // The Three.js scene ships as its own lazy chunk loaded after first paint, so its size
    // does not affect the initial load.
    chunkSizeWarningLimit: 1000,
  },
})
