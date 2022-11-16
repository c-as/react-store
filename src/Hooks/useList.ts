import { useEffect, useState } from "react"
import { fetchList, List } from "../Lib/Api"

export default function useList(query: string) {
  const [result, setResult] = useState<List>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error>()

  useEffect(
    function () {
      setIsLoading(true)
      setError(undefined)
      async function getList() {
        try {
          setIsLoading(true)
          let result = await fetchList(query)
          result.items.forEach((item, i) => {
            if (item._id === "5fbfff7d58aa65167efb52b1") {
              result.items.splice(i, 1)
            }
          })

          setResult(result)
        } catch (error) {
          if (error instanceof Error) {
            setError(error)
          } else {
            throw error
          }
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
