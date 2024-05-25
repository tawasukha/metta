import { PageContext } from "vike/types"

export const theme = (pageContext: PageContext) => {
  console.log("theme", pageContext)
  return "light"
}
