import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import Api from "../Lib/Api"

function Item(props) {
  const [item, setItem] = useState()

  useEffect(
    function () {
      async function fetchData() {
        try {
          let item = await Api.getItem(props.match.params.id)
          setItem(item)
        } catch (error) {
          setItem({})
        }
      }

      fetchData()
    },
    [props.match.params.id]
  )

  return <div>{JSON.stringify(item)}</div>
}

export default withRouter(Item)
