import { usePageContext } from "@/hooks/usePageContext"
import { trpc } from "@/trpc/client"
import React, { useEffect, useState } from "react"

export function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    ;(async () => {
      await trpc.preference.setCookie.mutate({ theme: "dark", locale: "id" })
    })()
  }, [])

  return (
    <button type="button" onClick={() => setCount((count) => count + 1)}>
      Counter {count}
    </button>
  )
}
