import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import styled from "styled-components"
import PropTypes from "prop-types"
import { Button } from "./Styles"

const Styled = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0rem 0.5rem;
`

const Container = styled.form`
  width: 40rem;
  max-width: 100%;
  margin: 0rem auto;
  padding: 0.5rem 0rem 0rem;
  display: flex;
  input {
    min-width: 0;
    flex-grow: 1;
    font: inherit;
    border-radius: 0.3rem 0rem 0rem 0.3rem;
    padding: 0.4rem;
    padding-left: 0.9rem;
    box-sizing: border-box;
    border: 1px solid lightgrey;
    border-right: none;
    :focus {
      outline: none;
      border-radius: 0.3rem;
      border: 1px solid deepskyblue;
    }
  }
`

const SearchButton = styled(Button)`
  margin: 0;
  padding: 0.4rem 1.5rem;
  border-left: none;
  border-radius: 0rem 0.3rem 0.3rem 0rem;
`

const ClearButton = styled.button`
  border: 1px solid lightgrey;
  padding: 0rem 1rem;
  border-left: none;
  border-right: none;
  background-color: white;
  font-weight: 1000;
  font: inherit;
  cursor: pointer;
  :focus {
    outline: none;
  }
`

export default function SearchBar({ onSearch }) {
  const location = useLocation()

  const [query, setQuery] = useState(() => {
    return new URLSearchParams(location.search).get("q") || ""
  })

  function Submit(event) {
    event.preventDefault()
    onSearch(query)
  }

  function Reset() {
    setQuery("")
    onSearch("")
  }

  async function onKeyUp(event) {
    if (event.keyCode === 27) {
      Reset()
    }
  }

  return (
    <Styled>
      <Container action="#" onSubmit={Submit}>
        <input
          type="text"
          onChange={(event) => setQuery(event.target.value)}
          onKeyUp={onKeyUp}
          value={query}
        />
        <ClearButton type="reset" onClick={Reset}>
          X
        </ClearButton>
        <SearchButton type="submit" onClick={Submit}>
          Search
        </SearchButton>
      </Container>
    </Styled>
  )
}

SearchBar.propTypes = {
  onSearch: PropTypes.func,
}
