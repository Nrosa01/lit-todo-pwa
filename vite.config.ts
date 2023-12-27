import { defineConfig } from 'vite'
import litCss from 'vite-plugin-lit-css'

const base = process.env.VITE_BASE ?? "/"

export default defineConfig({
  plugins: [litCss()],
  base: base
})