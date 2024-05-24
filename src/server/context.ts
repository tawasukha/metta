import { acl } from "./acl"
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify"

export function createContextInner() {
  return {
    acl,
  }
}

export const createContext = async ({
  res: reply,
  ...opt
}: CreateFastifyContextOptions) => {
  const innerContext = createContextInner()
  return { reply, ...opt, ...innerContext }
}

export type Context = Awaited<ReturnType<typeof createContext>>
