import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import Catalog from "../Components/Catalog/Catalog"
import Api from "../Lib/Api"

function Search(props) {
  const [items, setItems] = useState([])
  const [errorMsg, setErrorMsg] = useState()
  const [isLoading, setLoading] = useState(true)
  const [query] = useState(() => {
    const search = props.location.search
    return new URLSearchParams(search).get("q")
  })

  useEffect(
    function () {
      async function fetchData() {
        try {
          let items = await Api.getSearch(query)
          console.log(items)
          setItems(items)
        } catch (error) {
          setErrorMsg("Could not fetch search")
          return error
        } finally {
          setLoading(false)
        }
      }
      fetchData()
    },
    [query]
  )
  return (
    <div>
      <Catalog
        items={items}
        message={errorMsg ? errorMsg : `No results for query ${query}`}
        isLoading={isLoading}
      />
    </div>
  )
}

export default withRouter(Search)
