import { z } from "zod"

export const preference = z.object({
  theme: z.enum(["light", "dark"]),
  locale: z.enum(["id", "en"]),
})

export type Preference = z.infer<typeof preference>
