import React, { useMemo, useState, useEffect } from "react"
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
    margin-right: 2rem;
    :last-child {
      margin-right: 0rem;
    }
  }
`

export default function List() {
  const history = useHistory()
  const location = useLocation()

  const MAX_ITEMS = 10

  const pageIdx = useMemo(() => {
    return Number(new URLSearchParams(location.search).get("page")) || 0
  }, [location.search])

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

  const pageCount = useMemo(() => {
    return Math.ceil(result.total / MAX_ITEMS) || 0
  }, [result.total])

  const items = useMemo(() => {
    return result.items || []
  }, [result.items])

  const searchQuery = useMemo(() => {
    return new URLSearchParams(location.search).get("q")
  }, [location.search])

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
