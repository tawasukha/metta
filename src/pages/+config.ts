import vikeReact from "vike-react/config"
import type { Config } from "vike/types"
import Head from "@/components/layout/HeadDefault"
import Layout from "@/components/layout/LayoutDefault"
import { env } from "@/utils/env"
import { onRenderHtml } from "@/renderer/onRenderHtml"

export default {
  Layout,
  Head,
  onRenderHtml,
  meta: {
    theme: {
      env: {
        server: true,
        client: true,
      },
    },
  },
  title: env.APP_TITLE,
  extends: vikeReact,
} satisfies Config
