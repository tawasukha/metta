import dotenv from "dotenv"
import { z } from "zod"
import { extractDomain } from "./helper"

dotenv.config()

const data = z
  .object({
    NODE_ENV: z.enum(["development", "production"]),
    VITE_HOST: z.string(),
    APP_NAME: z.string(),
    APP_SECRET: z.string(),
    APP_TITLE: z.string(),
  })
  .parse(process.env)

const url = new URL(data.VITE_HOST)

export const env = {
  ...data,
  APP_PORT: +url.port,
  APP_HOSTNAME: url.hostname,
  APP_DOMAIN: extractDomain(data.VITE_HOST),
}
