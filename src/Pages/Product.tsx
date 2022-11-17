import { useState, useEffect, useContext, ChangeEvent } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import Rating from "../Components/Rating"
import { Input, Title, Message, Error, Sale } from "../Components/Styles"
import Button from "../Components/Button"
import useProduct from "../Hooks/useProduct"
import { CartContext, CartAction, CartActionType } from "../State/Cart"

const Styled = styled.div`
  @media (orientation: landscape) {
    width: 70rem;
    max-width: 100%;
    margin: 0rem auto;
    padding: 0rem 5rem;
  }
  @media (orientation: portrait) {
    margin: 1rem 3rem 3rem;
  }
`

const seperation = 2

const ProductImg = styled.img`
  @media (orientation: landscape) {
    width: calc(50% - ${seperation / 2.0}rem);
    float: left;
    padding-right: ${seperation / 2.0}rem;
  }
  @media (orientation: portrait) {
    display: block;
    margin: auto;
    max-width: 100%;
  }
`

const Info = styled.div`
  @media (orientation: landscape) {
    width: calc(50% - ${seperation / 2.0}rem);
    float: right;
    padding-left: ${seperation / 2.0}rem;
  }
  input {
    margin-right: 1rem;
  }
  span {
    display: inline-block;
  }
`

const StyledButton = styled(Button)`
  width: 6rem;
`

const Fetching = styled(Message)`
  background-color: lightgray;
  margin: 0rem auto;
  width: fit-content;
`

const Name = styled(Title)`
  padding: 0;
`

export default function Product() {
  const params = useParams()

  const { product, isLoading, error } = useProduct(params.id)

  const [quantity, setQuantity] = useState(0)

  const { products: cart, dispatch } = useContext(CartContext)

  useEffect(() => {
    if (product && product.stockCount > 0) {
      setQuantity(1)
    }
  }, [product])

  function quantityChanged(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    setQuantity(Number(value))
  }

  const inCart = (params.id && cart[params.id] && cart[params.id].amount) || 0

  function addToCart() {
    if (product) {
      if (quantity + inCart > product.stockCount || product.stockCount === 0) {
        alert("Insufficient Stock")
        return
      }

      dispatch({
        id: product._id,
        product: product,
        amount: quantity + inCart,
        type: CartActionType.Set,
      } as CartAction)
      alert(`Added ${quantity} to cart`)
    }
  }

  return (
    <Styled>
      <Title>Product</Title>
      {product ? (
        <div>
          <ProductImg src={product.imageUrl} alt={product.name} />
          <Info>
            <Name>{product.name}</Name>
            {product.isOnSale && <Sale>On Sale</Sale>}
            <Rating score={product.avgRating} />
            <p>{product.description}</p>
            <h3>${product.price}</h3>
            {inCart > 0 && (
              <>
                <Message>
                  {inCart} of this product is currently in your cart.
                </Message>
                <StyledButton to="/cart">View cart</StyledButton>
              </>
            )}
            <p>
              <Input
                type="number"
                min="1"
                max={product.stockCount}
                value={quantity}
                onChange={(event) => quantityChanged(event)}
                step="1"
              />
              <span>In stock: {product.stockCount}</span>
            </p>
            <StyledButton onClick={() => addToCart()}>Add to cart</StyledButton>
            {(product.stockCount < 1 || quantity > product.stockCount) && (
              <Error>Insufficient stock!</Error>
            )}
          </Info>
        </div>
      ) : isLoading ? (
        <Fetching>Fetching product..</Fetching>
      ) : (
        <Error>{error && error.toString()}</Error>
      )}
    </Styled>
  )
}
