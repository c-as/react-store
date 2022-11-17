import { useEffect, useState } from "react"
import { fetchProduct, ProductInterface } from "../Lib/Api"

export default function useProduct(id: string | undefined) {
  const [product, setResult] = useState<ProductInterface>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error>()

  useEffect(
    function () {
      setIsLoading(true)
      setError(undefined)
      async function getList(id: string) {
        try {
          setIsLoading(true)
          const result = await fetchProduct(id)
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
    product,
    isLoading,
    error,
  }
}
