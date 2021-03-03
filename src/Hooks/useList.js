import { useEffect, useState } from "react"
import Api from "../Lib/Api"

export default function useList(query) {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(
    function () {
      setIsLoading(true)
      setError()
      async function getItems() {
        try {
          const response = await fetch(`${Api}/item/list${query}`)
          const items = (await response.json()).items
          setItems(items)
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

  return { items, isLoading, error }
}
