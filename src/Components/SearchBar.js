import React, { useState } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const Styled = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0rem 0.5rem;
`

const searchButtonWidth = 5

const Container = styled.div`
  width: 30rem;
  max-width: 100%;
  margin: 0rem auto;
  padding: 0.5rem 0rem 0rem;
  height: 1.8rem;
  input {
    border-radius: 0.5rem 0rem 0rem 0.5rem;
    padding: 0rem 0.5rem;
    height: 100%;
    width: calc(100% - ${searchButtonWidth}rem);
    box-sizing: border-box;
    border: 1px solid grey;
    border-right: none;
    :focus {
      outline: none;
    }
  }
  button {
    width: ${searchButtonWidth}rem;
    height: 100%;
    border: 1px solid orange;
    border-left: none;
    border-radius: 0rem 0.5rem 0.5rem 0rem;
    background-color: orange;
    color: white;
    cursor: pointer;
    :focus {
      outline: none;
    }
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

  return (
    <Styled>
      <Container>
        <input type="text" onChange={(event) => onQueryInput(event)} />
        <button onClick={(event) => onSubmit(event)}>search</button>
      </Container>
    </Styled>
  )
}

SearchBar.propTypes = {
  onSearch: PropTypes.func,
}
