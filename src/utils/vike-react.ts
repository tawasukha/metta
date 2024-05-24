const projectKey = "_vike_react"

export function getGlobalObject<T extends Record<string, unknown> = never>(
  key: `${string}.ts`,
  defaultValue: T
): T {
  // @ts-ignore
  const globalObjectsAll = (globalThis[projectKey] =
    // @ts-ignore
    globalThis[projectKey] || {})
  const globalObject = (globalObjectsAll[key] =
    globalObjectsAll[key] || defaultValue)
  return globalObject
}

export function isCallable<T extends (...args: unknown[]) => unknown>(
  thing: T | unknown
): thing is T {
  return thing instanceof Function || typeof thing === "function"
}

export function isNotFalse<T>(val: T | false): val is T {
  return val !== false
}

export function assert(condition: unknown): asserts condition {
  if (condition) return
  throw new Error(
    "You stumbled upon a vike-react bug. Go to https://github.com/vikejs/vike-react/issues/new and copy-paste this error. A maintainer will fix the bug (usually under 24 hours)."
  )
}
