import { useEffect, useState } from 'react'

async function doFetch(url: string, options?: RequestInit) {
  const result = await fetch(url, options)
  const json = await result.json()

  if (json.status === 'ok') {
    return json
  } else {
    throw new Error(json.message)
  }
}

export function useFetch(url: string): ResponseState {
  const [response, setResponse] = useState<ResponseState>(null)

  useEffect(() => {
    const controller = new AbortController()
    let didCancel = false
    ;(async () => {
      setResponse(null)
      try {
        const result = await doFetch(url, { signal: controller.signal })
        if (didCancel) return
        setResponse(result)
      } catch (e) {
        setResponse({ error: e instanceof Error ? e.message : 'Unknown error' })
      }
    })()

    return () => {
      controller.abort()
      didCancel = true
    }
  }, [url])

  return response
}
