import React from "react"
import { withRouter } from "react-router-dom"

import useList from "../Hooks/useList"

import Catalog from "../Components/Catalog/Catalog"
import SearchBar from "../Components/SearchBar"

function List(props) {
  const { items, isLoading, error } = useList(props.location.search)

  function onSearch(query) {
    if (query.length > 0) {
      props.history.push(`/list?q=${query}`)
    } else {
      props.history.push(`/`)
    }
  }
  return (
    <div>
      <div>
        <SearchBar onSearch={onSearch} />
        <Catalog
          items={items}
          isLoading={isLoading}
          message={error && error.toString()}
        />
      </div>
    </div>
  )
}

export default withRouter(List)
