import React, { useMemo, useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"
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
    margin-right: 1rem;
    :last-child {
      margin-right: 0rem;
    }
  }
  button {
    border: 1px solid orange;
    padding: 0.4rem 1.5rem;
    border-radius: 0.3rem;
    background-color: orange;
    color: white;
    font: inherit;
    cursor: pointer;
  }
`

export default function List() {
  const history = useHistory()
  const location = useLocation()

  const MAX_ITEMS = 10

  const pageIdx = Number(new URLSearchParams(location.search).get("page")) || 0

  function setPageIdx(value) {
    const queries = new URLSearchParams(location.search)
    queries.set("page", value)
    history.push({ search: queries.toString() })
  }

  const { result, isLoading, error } = useList(
    `?${location.search.replace("?", "")}&from=${
      pageIdx * MAX_ITEMS
    }&size=${MAX_ITEMS}`
  )

  const pageCount = Math.ceil(result.total / MAX_ITEMS) || 0

  const searchQuery = new URLSearchParams(location.search).get("q")

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
      history.push(`/list?q=${query}`)
    } else {
      history.push(`/`)
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
  }, [result.items])

  return (
    <div>
      <div>
        <SearchBar onSearch={onSearch} />
        <Catalog items={result.items} isLoading={isLoading} message={message} />
        <PageSelector>
          {pageIdx !== 0 && (
            <>
              <button onClick={() => setPageIdx(0)}>First</button>
              <button onClick={decrementPage}>{"<"}</button>
            </>
          )}

          <span>{`${pageIdx + 1}/${pageCount}`}</span>

          {pageCount > 1 && pageIdx !== pageCount - 1 && (
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
