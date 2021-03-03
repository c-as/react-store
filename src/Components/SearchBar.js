import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import styled from "styled-components"
import PropTypes from "prop-types"

const Styled = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0rem 0.5rem;
`

const Container = styled.div`
  width: 30rem;
  max-width: 100%;
  margin: 0rem auto;
  padding: 0.5rem 0rem 0rem;
  height: 1.8rem;
  display: flex;
  input {
    flex-grow: 1;
    border-radius: 0.2rem 0rem 0rem 0.2rem;
    padding: 0rem 0.5rem;
    box-sizing: border-box;
    border: 1px solid grey;
    border-right: none;
    :focus {
      outline: none;
    }
  }
`

const SearchButton = styled.button`
  border: 1px solid orange;
  border-left: none;
  border-radius: 0rem 0.2rem 0.2rem 0rem;
  background-color: orange;
  color: white;
  cursor: pointer;
  :focus {
    outline: none;
  }
`

const ClearButton = styled.button`
  border: 1px solid grey;
  border-left: none;
  border-right: none;
  background-color: white;
  font-weight: 1000;
  cursor: pointer;
  :focus {
    outline: none;
  }
`

function SearchBar({ onSearch, location }) {
  const [query, setQuery] = useState("")

  useEffect(() => {
    const search = location.search
    const rawQuery = new URLSearchParams(search).get("q")
    if (rawQuery) {
      setQuery(rawQuery)
    }
  }, [location.search])

  function Submit() {
    onSearch(query)
  }

  function Reset() {
    setQuery("")
    onSearch("")
  }

  async function onKeyDown(event) {
    if (event.keyCode === 27) {
      Reset()
    }
    if (event.keyCode === 13) {
      Submit()
    }
  }

  return (
    <Styled>
      <Container>
        <input
          type="text"
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={onKeyDown}
          value={query}
        />
        <ClearButton onClick={Reset}>X</ClearButton>
        <SearchButton onClick={Submit}>search</SearchButton>
      </Container>
    </Styled>
  )
}

SearchBar.propTypes = {
  onSearch: PropTypes.func,
}

export default withRouter(SearchBar)
