import React, { useState } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const Styled = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0rem 0.5rem;
`

const Container = styled.form`
  width: 30rem;
  max-width: 100%;
  margin: 0rem auto;
  padding: 0.5rem 0rem 0rem;
  height: 1.8rem;
  display: flex;
  input {
    flex-grow: 1;
    border-radius: 0.5rem 0rem 0rem 0.5rem;
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
  border-radius: 0rem 0.5rem 0.5rem 0rem;
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

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("")

  function onSubmit(event) {
    if (onSearch && query.length > 0) {
      onSearch(query)
    }
  }

  function onQueryInput(event) {
    const { value } = event.target
    setQuery(value)
  }

  function onKeyDown(event) {
    if (event.keyCode === 27) {
      setQuery("")
    }
  }

  return (
    <Styled>
      <Container onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onQueryInput}
          onKeyDown={onKeyDown}
          value={query}
        />
        <ClearButton type="reset" onClick={() => setQuery("")}>
          X
        </ClearButton>
        <SearchButton type="submit">search</SearchButton>
      </Container>
    </Styled>
  )
}

SearchBar.propTypes = {
  onSearch: PropTypes.func,
}
