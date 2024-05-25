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
