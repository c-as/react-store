import { useEffect, useState } from "react"

export default function useList(query) {
  const [json, setJson] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(
    function () {
      setIsLoading(true)
      setError()
      async function getItems() {
        try {
          const response = await fetch(query)
          const json = await response.json()
          console.log(json)
          setJson(json)
        } catch (error) {
          console.log(error)
          setError(error)
        } finally {
          setIsLoading(false)
        }
      }

      getItems()
    },
    [query]
  )

  return { json, isLoading, error }
}
