import { env } from "@/utils/env"
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { AppRouter, appRouter } from "@/trpc/server"
import { Context, createContext } from "./context"
import { renderPage } from "vike/server"
import { RouteHandlerMethod } from "fastify"
const __filename = fileURLToPath(import.meta.url)
const root = dirname(__filename)

export const isDev = env.NODE_ENV === "development"
export const port = +env.APP_PORT
export const title = env.APP_TITLE

export const distClient = {
  root: `${root}/dist/client`,
  wildcard: false,
}

export const cors = {
  origin: new RegExp(`/${env.APP_HOSTNAME}/`),
  credentials: true,
}

export const session = {
  secret: `${env.APP_SECRET}`,
  cookieName: `${env.APP_NAME}Session`,
  cookie: {
    secure: true,
    domain: `.${env.APP_DOMAIN}`,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
}

export const trpc = {
  prefix: "/api/trpc",
  trpcOptions: {
    router: appRouter,
    createContext,
    onError(opts: { error: Error; type: string; path?: string; ctx: Context }) {
      const { error, ctx, path, type } = opts
      ctx.req.log.error(
        `${ctx.req.session?.user?.name || "Anonymous"} [${type}:${path}]`
      )
      ctx.req.log.error(error.cause ? error.cause : error.stack)
    },
  },
}

export const ssrRender: RouteHandlerMethod = async function (request, reply) {
  const pageContextInit = { urlOriginal: request.originalUrl || request.url }

  const pageContext = await renderPage(pageContextInit)
  const { httpResponse } = pageContext

  if (!httpResponse) {
    return
  } else {
    const { statusCode, headers, body } = httpResponse

    headers.forEach(([name, value]) => reply.header(name, value))
    reply.code(statusCode)

    return reply.send(body)
  }
}
