import { t } from "@/server/trpc"
import * as schema from "@/schema"
import { PREFERENCE } from "@/utils/constant"

export const preference = t.router({
  setCookie: t.procedure.input(schema.preference).mutation(({ ctx, input }) => {
    const preference = { ...PREFERENCE, ...input }

    ctx.cookie.set("preference", `${JSON.stringify(preference)}`)

    return preference
  }),
})
