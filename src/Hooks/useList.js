import useFetch from "./useFetch"
import Api from "../Lib/Api"

export default function useItem(query) {
  const result = useFetch(`${Api}/item/list/${query}`)

  return {
    items: result.json ? result.json.items : [],
    isLoading: result.isLoading,
    error: result.error,
  }
}
