import Rating from "./Rating"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Sale } from "./Styles"
import Button from "./Button"
import { ProductInterface } from "../Lib/Api"

const Styled = styled.div`
  margin: 0.5rem;
  border: 1px solid lightgray;
  border-radius: 0.3rem;
  text-align: center;
  padding: 1rem;
  width: 15rem;
  flex-grow: 1;
  header {
    font-size: 1.5rem;
  }
`

const ImgContainer = styled.div`
  height: 15rem;
  margin-bottom: 1rem;
  img {
    vertical-align: middle;
    max-height: 100%;
    max-width: 100%;
  }
`
const Helper = styled.span`
  display: inline-block;
  height: 100%;
  vertical-align: middle;
`

const Info = styled.div`
  text-align: left;
  h3 {
    display: inline;
  }
`

const StyledButton = styled(Button)`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  margin: 2rem auto 0rem;
`

const StyledSale = styled(Sale)`
  display: inline;
  font-size: 0.9rem;
`

export default function CatalogProduct({
  product,
}: {
  product: ProductInterface
}) {
  return (
    <Styled>
      <ImgContainer>
        <Helper />
        <img src={product.imageUrl} alt={product.name} />
      </ImgContainer>
      <Link to={`/product/${product._id}`}>
        <header>{product.name}</header>
      </Link>
      <Info>
        <Rating score={product.avgRating} />
        <h3> ${product.price} </h3>
        {product.isOnSale && <StyledSale>On Sale</StyledSale>}
      </Info>
      <StyledButton to={`/product/${product._id}`}>View Product</StyledButton>
    </Styled>
  )
}
