import { useEffect, useState } from "react"
import { fetchItem } from "../Lib/Api"

export default function useItem(query) {
  const [item, setResult] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(
    function () {
      setIsLoading(true)
      setError()
      async function getList() {
        try {
          setIsLoading(true)
          const result = await fetchItem(query)
          setResult(result)
        } catch (error) {
          setError(error)
        } finally {
          setIsLoading(false)
        }
      }

      getList()
    },
    [query]
  )

  return {
    item,
    isLoading,
    error,
  }
}
