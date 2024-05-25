export const extractDomain = (value: unknown) => {
  const url = toURL(value)

  if (!url) {
    return null
  }

  const hostnameParts = url.hostname.split(".")

  if (hostnameParts.length <= 2) {
    return url.hostname
  }

  const prefixes = ["com", "co", "org", "net", "gov", "edu"]
  const potentialTwoPartTLD = `${hostnameParts[hostnameParts.length - 2]}.${
    hostnameParts[hostnameParts.length - 1]
  }`

  return prefixes.includes(hostnameParts[hostnameParts.length - 2])
    ? `${hostnameParts[hostnameParts.length - 3]}.${potentialTwoPartTLD}`
    : hostnameParts.slice(-2).join(".") // Fallback to last two parts of hostname
}

const toURL = (value: unknown) => {
  if (value instanceof URL) {
    return value
  }

  if (typeof value !== "string" || !value) {
    return null
  }

  try {
    const url = new URL(value)
    return url.hostname ? url : null
  } catch (error) {
    return null
  }
}

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
