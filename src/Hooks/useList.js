import useFetch from "./useFetch"
import Api from "../Lib/Api"

export default function useItem(query) {
  const result = useFetch(`${Api}/item/list/${query}`)

  return {
    result: result.json ? result.json : {},
    isLoading: result.isLoading,
    error: result.error,
  }
}
