import useFetch from "./useFetch"
import { url } from "../Lib/Api"

export default function useItem(query) {
  const result = useFetch(`${url}/item/list/${query}`)

  return {
    result: result.json ? result.json : {},
    isLoading: result.isLoading,
    error: result.error,
  }
}
