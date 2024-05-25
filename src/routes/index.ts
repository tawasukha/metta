import { t } from "@/server/trpc"
import { todoItems } from "@/database/todoItems"
import { preference } from "./preference"

export const appRouter = t.router({
  preference,
  demo: t.procedure.query(async ({ ctx }) => {
    return { demo: true }
  }),
  onNewTodo: t.procedure
    .input((value): string => {
      if (typeof value === "string") {
        return value
      }
      throw new Error("Input is not a string")
    })
    .mutation(async (opts) => {
      todoItems.push({ text: opts.input })
      return { todoItems }
    }),
})

export type AppRouter = typeof appRouter
