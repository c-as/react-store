import { useEffect, useState } from "react"
import Api from "../Lib/Api"

export default function useList(id) {
  const [item, setItem] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(
    function () {
      setIsLoading(true)
      setError()
      async function getItems() {
        try {
          const response = await fetch(`${Api}/item/${id}`)
          const item = await response.json()
          setItem(item)
        } catch (error) {
          console.log(error)
          setError(error)
        } finally {
          setIsLoading(false)
        }
      }

      getItems()
    },
    [id]
  )

  return { item, isLoading, error }
}
