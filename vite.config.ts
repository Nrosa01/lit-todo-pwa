import { defineConfig } from 'vite'
import litCss from 'vite-plugin-lit-css'
import { VitePWA } from 'vite-plugin-pwa'

const base = process.env.VITE_BASE ?? "/"

export default defineConfig({
  plugins: [litCss(), VitePWA({
    registerType: 'autoUpdate',
    devOptions: { enabled: false },
    manifest:
    {
      icons:
        [
          {
            src: "./icon.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
    },
  })],
  base: base
})