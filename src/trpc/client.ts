import { createTRPCClient, httpBatchLink } from "@trpc/client"
import type { AppRouter } from "@/routes"
import superjson from "superjson"

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
    }),
  ],
})
