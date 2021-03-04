import React, { useMemo, useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import styled from "styled-components"

import useList from "../Hooks/useList"

import Catalog from "../Components/Catalog/Catalog"
import SearchBar from "../Components/SearchBar"

const PageSelector = styled.div`
  width: max-content;
  margin: 0rem auto;
  padding: 1rem;
  span {
    display: inline-block;
  }
  * {
    margin-right: 2rem;
    :last-child {
      margin-right: 0rem;
    }
  }
`

function List(props) {
  const MAX_ITEMS = 10

  const [pageIdx, setPageIdx] = useState(0)

  //TODO
  //Calc page count
  const pageCount = 3

  // TODO
  // use history
  const { items, isLoading, error } = useList(
    `?${props.location.search.replace("?", "")}&from=${
      pageIdx * MAX_ITEMS
    }&size=${MAX_ITEMS}`
  )
  const searchQuery = useMemo(() => {
    return new URLSearchParams(props.location.search).get("q")
  }, [props.location.search])

  const message = useMemo(() => {
    if (error) {
      return error.toString()
    } else if (searchQuery) {
      return `No results for query ${searchQuery}`
    } else {
      return
    }
  }, [error, searchQuery])

  function onSearch(query) {
    if (query.length > 0) {
      props.history.push(`/list?q=${query}`)
    } else {
      props.history.push(`/`)
    }
  }

  function decrementPage() {
    setPageIdx(Math.max(pageIdx - 1, 0))
  }

  function incrementPage() {
    setPageIdx(Math.min(pageIdx + 1, pageCount - 1))
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [items])

  return (
    <div>
      <div>
        <SearchBar onSearch={onSearch} />
        <Catalog items={items} isLoading={isLoading} message={message} />
        <PageSelector>
          {pageIdx !== 0 && (
            <>
              <button onClick={() => setPageIdx(0)}>First</button>
              <button onClick={decrementPage}>{"<"}</button>
            </>
          )}

          <span>{`${pageIdx + 1}/${pageCount}`}</span>

          {pageIdx !== pageCount - 1 && (
            <>
              <button onClick={incrementPage}>{">"}</button>

              <button onClick={() => setPageIdx(pageCount - 1)}>Last</button>
            </>
          )}
        </PageSelector>
      </div>
    </div>
  )
}

export default withRouter(List)
