import useFetch from "./useFetch"
import { url } from "../Lib/Api"

export default function useItem(id) {
  const result = useFetch(`${url}/item/${id}`)

  return {
    item: result.json || {},
    isLoading: result.isLoading,
    error: result.error,
  }
}
