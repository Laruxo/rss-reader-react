import { useEffect, useState } from 'react'

async function doFetch(url: string, options?: RequestInit) {
  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error(`[${response.status}] Failed to fetch`)
  }
  const json = await response.json()
  if (json.status !== 'ok') {
    throw new Error(json.message)
  }
  return json
}

export function useFetch<T>(url: string) {
  const [response, setResponse] = useState<
    | { type: 'SUCCESS'; result: T }
    | { type: 'ERROR'; error: string }
    | { type: 'LOADING' }
  >({ type: 'LOADING' })

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      setResponse({ type: 'LOADING' })
      try {
        const result = await doFetch(url, { signal: controller.signal })
        setResponse({ type: 'SUCCESS', result })
      } catch (e) {
        if (e instanceof Error && e.name === 'AbortError') return
        console.error(e)
        setResponse({
          type: 'ERROR',
          error: e instanceof Error ? e.message : 'Unknown error',
        })
      }
    }
    fetchData()

    return () => controller.abort()
  }, [url])

  return response
}
