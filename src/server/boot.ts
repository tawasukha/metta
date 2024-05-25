import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify"
import { FastifyInstance } from "fastify"
import cookie from "@fastify/cookie"
import session from "@fastify/session"
import * as option from "./option"

export async function boot(instance: FastifyInstance) {
  const port = option.isDev ? option.port - 1000 : option.port
  await instance.register(cookie)
  await instance.register(session, option.session)
  await instance.register(await import("@fastify/middie"))
  await instance.register(fastifyTRPCPlugin, option.trpc)
  if (!option.isDev) {
    await instance.register(await import("@fastify/static"), option.distClient)
  }
  instance.all("/*", option.ssrRender)
  instance.listen(
    {
      port,
      host: "0.0.0.0",
    },
    () => {
      console.log(`Server listening on http://0.0.0.0:${port}`)
    }
  )
}
