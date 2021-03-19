import { useEffect, useState } from "react"
import { fetchList } from "../Lib/Api"

export default function useItem(query) {
  const [result, setResult] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(
    function () {
      setIsLoading(true)
      setError()
      async function getList() {
        try {
          setIsLoading(true)
          const result = await fetchList(query)
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
    result,
    isLoading,
    error,
  }
}
