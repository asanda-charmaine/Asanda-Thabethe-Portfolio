import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// If you deploy to a sub-path (e.g. GitHub Pages at /repo-name/), set base: '/repo-name/'
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
