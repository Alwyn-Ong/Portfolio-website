import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { transformWithEsbuild } from 'vite'

export default defineConfig({
  base: '/Portfolio-website/',
  plugins: [
    {
      name: 'treat-js-files-as-jsx',
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) return null
        return transformWithEsbuild(code, id, { loader: 'jsx' })
      },
    },
    react(),
  ],
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
})
