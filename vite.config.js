import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { transformWithEsbuild } from 'vite'
import { readFileSync } from 'node:fs'

const SITE_URL = 'https://alwyn-ong.github.io/Portfolio-website/'

const escapeHtml = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

// Fill <title> and description/og meta from public/resumeData.json at build time.
function resumeMeta() {
  return {
    name: 'resume-meta',
    transformIndexHtml(html) {
      const { main = {} } = JSON.parse(readFileSync('public/resumeData.json', 'utf8'))
      const tags = [{ tag: 'meta', attrs: { property: 'og:type', content: 'website' }, injectTo: 'head' }]
      if (main.name) {
        html = html.replace(/<title>.*<\/title>/, `<title>${escapeHtml(main.name)}</title>`)
        tags.push({ tag: 'meta', attrs: { property: 'og:title', content: main.name }, injectTo: 'head' })
      }
      if (main.description) {
        tags.push({ tag: 'meta', attrs: { name: 'description', content: main.description }, injectTo: 'head' })
        tags.push({ tag: 'meta', attrs: { property: 'og:description', content: main.description }, injectTo: 'head' })
      }
      if (main.image) {
        tags.push({ tag: 'meta', attrs: { property: 'og:image', content: `${SITE_URL}images/${main.image}` }, injectTo: 'head' })
      }
      return { html, tags }
    },
  }
}

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
    resumeMeta(),
  ],
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
})
