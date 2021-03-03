import React, { useMemo } from "react"
import { withRouter } from "react-router-dom"

import useList from "../Hooks/useList"

import Catalog from "../Components/Catalog/Catalog"
import SearchBar from "../Components/SearchBar"

function List(props) {
  const { items, isLoading, error } = useList(props.location.search)

  const query = useMemo(() => {
    return new URLSearchParams(props.location.search).get("q")
  }, [props.location.search])

  const message = useMemo(() => {
    if (error) {
      return error.toString()
    } else if (query) {
      return `No results for query ${query}`
    } else {
      return
    }
  }, [error, query])

  function onSearch(query) {
    if (query.length > 0) {
      props.history.push(`/list?q=${query}`)
    } else {
      props.history.push(`/`)
    }
  }
  //TODO
  // maak get search query hook

  console.log(error && error.toString())

  return (
    <div>
      <div>
        <SearchBar onSearch={onSearch} />
        <Catalog items={items} isLoading={isLoading} message={message} />
      </div>
    </div>
  )
}

export default withRouter(List)
