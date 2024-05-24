import ssr from "vike/plugin"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { env } from "./src/utils/env"

const server = new URL(env.VITE_HOST)
const port = env.APP_PORT
const target = `http://${server.hostname}:${port - 1000}`

export default defineConfig({
  server: {
    open: true,
    proxy: {
      "/api": {
        target,
        secure: false,
        changeOrigin: true,
      },
    },
    port,
  },
  plugins: [react({}), ssr({})],
})
