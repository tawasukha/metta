import { PageContext } from "vike/types"
import * as constant from "@/utils/constant"
import { Preference } from "@/schema"

export function getPreference(pageContext: PageContext): Preference {
  const cookies = pageContext?.cookies
  return cookies?.preference
    ? JSON.parse(cookies.preference)
    : constant.PREFERENCE
}
