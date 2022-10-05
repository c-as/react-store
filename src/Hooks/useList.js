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
          let result = await fetchList(query)

          for (let i in result.items) {
            if (result.items[i]._id === "5fbfff7d58aa65167efb52b1") {
              result.items.splice(i, 1)
            }
          }

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
