import { type Preference } from "@/schema"

declare global {
  type ExcludeFirstParameter<T extends [p1: unknown, ...pR: unknown[]]> =
    T extends [infer _First, ...infer Rest] ? Rest : never

  namespace Vike {
    interface PageContext {
      cookies: Record<string, string>
      user?: {
        name: string
        id: string
        isAdmin: boolean
      }
      Page?: () => React.ReactNode
      userAgent?: string
      page?: JSX.Element
      root?: ReactDOM.Root
    }
  }

  namespace VikePackages {
    interface ConfigVikeReact {
      theme: Preference["theme"]
      locale: Preference["locale"]
    }
  }
}

declare module "fastify" {
  interface Session {
    user: any
    destroy: any
  }
  interface FastifyRequest {
    cookies: FastifyCookie
    session: Session
  }
}

export {}
