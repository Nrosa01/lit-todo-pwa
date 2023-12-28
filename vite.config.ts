import { defineConfig } from 'vite'
import litCss from 'vite-plugin-lit-css'
import { VitePWA } from 'vite-plugin-pwa'
import { viteStaticCopy } from 'vite-plugin-static-copy'

const base = process.env.VITE_BASE ?? "/"
const iconsPath = 'node_modules/@shoelace-style/shoelace/dist/assets/icons';

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /\/assets\/icons\/(.+)/,
        replacement: `${iconsPath}/$1`,
      },
    ],
  },
  plugins: 
  [
    litCss(),
    viteStaticCopy({
      targets: [
        {
          src: iconsPath,
          dest: 'assets/'
        }
      ]
    }),
    VitePWA({
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