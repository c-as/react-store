import { useMemo, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import styled from "styled-components"
import useList from "../Hooks/useList"
import CatalogProduct from "../Components/CatalogProduct"
import { Message, Title } from "../Components/Styles"
import Button from "../Components/Button"

const Container = styled.div`
  width: 75rem;
  max-width: 100%;
  margin: 0rem auto;
`

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
`

const StyledButton = styled(Button)`
  display: inline;
  padding: 0.4rem 1.5rem;
`

const Catalog = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: center;
`

export default function List() {
  const navigate = useNavigate()
  const location = useLocation()

  const MAX_ITEMS = 10

  const pageIdx = Number(new URLSearchParams(location.search).get("page")) || 0

  function setPageIdx(value: number) {
    const queries = new URLSearchParams(location.search)
    queries.set("page", value.toString())
    navigate({ search: queries.toString() })
  }

  const { result, isLoading, error } = useList(
    `?${location.search.replace("?", "")}&from=${
      pageIdx * MAX_ITEMS
    }&size=${MAX_ITEMS}`
  )

  const pageCount = Math.ceil((result ? result.total : 0) / MAX_ITEMS) || 0
  const searchQuery = new URLSearchParams(location.search).get("q")

  const message = useMemo(() => {
    if (isLoading) {
      return "Fetching products.."
    } else {
      if (error) {
        return error.toString()
      } else if (searchQuery) {
        return `No results for query: '${searchQuery}'`
      } else {
        return
      }
    }
  }, [error, searchQuery, isLoading])

  const title = useMemo(() => {
    const params = new URLSearchParams(location.search)

    if (params.get("q")) {
      return `Results for query: '${params.get("q")}'`
    } else if (params.get("isOnSale") === "true") {
      return `Deals`
    } else if (params.get("page")) {
      return `Page: ${Number(params.get("page")) + 1}`
    } else {
      return `Catalog`
    }
  }, [location.search])

  function decrementPage() {
    setPageIdx(Math.max(pageIdx - 1, 0))
  }

  function incrementPage() {
    setPageIdx(Math.min(pageIdx + 1, pageCount - 1))
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [result])

  return (
    <Container>
      <Title>{title}</Title>
      <Catalog>
        {result ? (
          result.products.map((product) => (
            <CatalogProduct product={product} key={product._id} />
          ))
        ) : (
          <Message>{message}</Message>
        )}
      </Catalog>
      <PageSelector>
        {pageIdx !== 0 && (
          <>
            <StyledButton onClick={() => setPageIdx(0)}>First</StyledButton>
            <StyledButton onClick={decrementPage}>{"<"}</StyledButton>
          </>
        )}

        <span>{`${pageIdx + 1}/${pageCount}`}</span>

        {pageCount > 1 && pageIdx !== pageCount - 1 && (
          <>
            <StyledButton onClick={incrementPage}>{">"}</StyledButton>

            <StyledButton onClick={() => setPageIdx(pageCount - 1)}>
              Last
            </StyledButton>
          </>
        )}
      </PageSelector>
    </Container>
  )
}
