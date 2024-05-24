import { boot } from "./boot"
import Fastify from "fastify"

const app = Fastify({
  logger: true,
})

boot(app)
