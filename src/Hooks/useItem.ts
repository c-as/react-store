import { useEffect, useState } from "react"
import { fetchItem, ItemInterface } from "../Lib/Api"

export default function useItem(id: string | undefined) {
  const [item, setResult] = useState<ItemInterface>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error>()

  useEffect(
    function () {
      setIsLoading(true)
      setError(undefined)
      async function getList(id: string) {
        try {
          setIsLoading(true)
          const result = await fetchItem(id)
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

      if (id) {
        getList(id)
      }
    },
    [id]
  )

  return {
    item,
    isLoading,
    error,
  }
}
