import { renderToReadableStream } from 'react-dom/server'
import { RemixServer } from '@remix-run/react'
import type { EntryContext } from '@shopify/remix-oxygen'
import isbot from 'isbot'

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const body = await renderToReadableStream(
    <RemixServer context={remixContext} url={request.url} />,
    {
      signal: request.signal,
      onError(error) {
        console.error(error)
        responseStatusCode = 500
      },
    },
  )

  if (isbot(request.headers.get('User-Agent'))) {
    await body.allReady
  }

  responseHeaders.set('Content-Type', 'text/html')

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  })
}
