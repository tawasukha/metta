import { renderToString } from "react-dom/server"
import { renderToStream } from "react-streaming/server"
import { escapeInject, dangerouslySkipEscape } from "vike/server"
import { getHeadSetting } from "./getHeadSetting"
import { getPageElement } from "./getPageElement"
import { PageContextProvider } from "@/hooks/usePageContext"
import React from "react"
import type { OnRenderHtmlAsync } from "vike/types"
import { getPreference } from "./getPreference.jsx"

export const onRenderHtml: OnRenderHtmlAsync = async (
  pageContext
): ReturnType<OnRenderHtmlAsync> => {
  const title = getHeadSetting("title", pageContext)
  const favicon = getHeadSetting("favicon", pageContext)
  const preference = getPreference(pageContext)

  const titleTag = !title ? "" : escapeInject`<title>${title}</title>`
  const faviconTag = !favicon
    ? ""
    : escapeInject`<link rel="icon" href="${favicon}" />`

  const Head = pageContext.config.Head || (() => <></>)
  let head = (
    <PageContextProvider pageContext={pageContext}>
      <Head />
    </PageContextProvider>
  )
  if (pageContext.config.reactStrictMode !== false) {
    head = <React.StrictMode>{head}</React.StrictMode>
  }

  const headHtml = dangerouslySkipEscape(renderToString(head))

  let pageView:
    | string
    | ReturnType<typeof dangerouslySkipEscape>
    | Awaited<ReturnType<typeof renderToStream>>
  if (!pageContext.Page) {
    pageView = ""
  } else {
    const page = getPageElement(pageContext)
    const {
      stream,
      // @ts-expect-error
      _streamIsRequied,
    } = pageContext.config
    if (!stream && !_streamIsRequied) {
      pageView = dangerouslySkipEscape(renderToString(page))
    } else {
      const disable = stream === false ? true : undefined
      pageView = await renderToStream(page, {
        userAgent: pageContext.userAgent,
        disable,
      })
    }
  }

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang='${preference.locale}'>
      <head>
        <meta charset="UTF-8" />
        ${titleTag}
        ${headHtml}
        ${faviconTag}
      </head>
      <body class='${preference.theme}'>
        <div id="root">${pageView}</div>
      </body>
    </html>`

  return documentHtml
}
