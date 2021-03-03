import useFetch from "./useFetch"
import Api from "../Lib/Api"

export default function useItem(id) {
  const result = useFetch(`${Api}/item/${id}`)

  return {
    item: result.json || {},
    isLoading: result.isLoading,
    error: result.error,
  }
}
