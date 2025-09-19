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
  const [response, setResponse] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      setResponse(null)
      try {
        const result = await doFetch(url, { signal: controller.signal })
        setResponse(result)
        setIsLoading(false)
      } catch (e) {
        if (e instanceof Error && e.name === 'AbortError') return
        console.error(e)
        setError(e instanceof Error ? e.message : 'Unknown error')
        setIsLoading(false)
      }
    }
    fetchData()

    return () => controller.abort()
  }, [url])

  return { response, isLoading, error }
}
