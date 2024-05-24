import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify"
import { FastifyInstance } from "fastify"
import * as option from "./option"

export async function boot(instance: FastifyInstance) {
  const port = option.isDev ? option.port - 1000 : option.port
  await instance.register(await import("@fastify/middie"))
  await instance.register(fastifyTRPCPlugin, option.trpc)
  if (!option.isDev) {
    await instance.register(await import("@fastify/static"), option.distClient)
  }
  instance.all("/*", option.ssrRender)
  instance.listen(
    {
      port,
    },
    () => {
      console.log(`Server listening on http://localhost:${port}`)
    }
  )
}
