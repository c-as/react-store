import { FormEvent, KeyboardEvent, useState } from "react"
import { useLocation } from "react-router-dom"
import styled from "styled-components"
import { Input, Secondary } from "./Styles"
import Button from "./Button"

const Styled = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0rem 0.5rem;
  background-color: ${Secondary};
`

const Container = styled.form`
  width: 40rem;
  max-width: 100%;
  margin: 0rem auto;
  padding: 0.4rem 0rem;
  display: flex;
`

const StyledInput = styled(Input)`
  min-width: 0;
  flex-grow: 1;
  border-radius: 0.3rem 0rem 0rem 0.3rem;
  border-right: none;
`

const SearchButton = styled(Button)`
  margin: 0;
  padding: 0.4rem 1.5rem;
  border-left: none;
  border-radius: 0rem 0.3rem 0.3rem 0rem;
`

const ClearButton = styled.div`
  background-color: white;
  display: inline-block;
  border: 1px solid lightgrey;
  border-left: none;
  border-right: none;
  cursor: pointer;
  padding: 0rem 1rem;
  padding-top: 0.3rem;
`

export default function SearchBar({
  onSearch,
}: {
  onSearch: (query: string) => void
}) {
  const location = useLocation()

  const [query, setQuery] = useState(() => {
    return new URLSearchParams(location.search).get("q") || ""
  })

  function Submit(event: FormEvent) {
    event.preventDefault()
    onSearch(query)
  }

  function Reset() {
    setQuery("")
    onSearch("")
  }

  function onKeyUp(event: KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode === 27) {
      Reset()
    }
  }

  return (
    <Styled>
      <Container action="#" onSubmit={Submit}>
        <StyledInput
          type="text"
          onChange={(event) => setQuery(event.target.value)}
          onKeyUp={onKeyUp}
          value={query}
        />
        <ClearButton onClick={Reset}>X</ClearButton>
        <SearchButton onClick={Submit}>Search</SearchButton>
      </Container>
    </Styled>
  )
}
