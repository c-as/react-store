import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import Api from "../Lib/Api"
import styled from "styled-components"

const Styled = styled.div`
  width: 95rem;
  max-width: 100%;
  margin: 1rem auto;
`

function Item(props) {
  const [item, setItem] = useState({})

  useEffect(
    function () {
      async function fetchData() {
        try {
          let item = await Api.getItem(props.match.params.id)
          setItem(item)
          console.log(item)
        } catch (error) {
          setItem({})
        }
      }

      fetchData()
    },
    [props.match.params.id]
  )

  return (
    <Styled>
      <img src={item.imageUrl} alt={item.name} />
      <div className="info">
        <h2>{item.name}</h2>
      </div>
    </Styled>
  )
}

export default withRouter(Item)
