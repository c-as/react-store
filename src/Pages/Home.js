import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import Catalog from "../Components/Catalog/Catalog"
import Api from "../Lib/Api"
import SearchBar from "../Components/SearchBar"

function Home(props) {
  const [items, setItems] = useState([])
  const [errorMsg, setErrorMsg] = useState()
  const [isLoading, setLoading] = useState(true)

  function onSearch(query) {
    props.history.push(`/search?q=${query}`)
  }

  useEffect(function () {
    async function fetchData() {
      try {
        let items = await Api.getItems()
        setItems(items)
      } catch (error) {
        setErrorMsg("Could not fetch items")
        return error
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <SearchBar onSearch={onSearch} />
      <Catalog items={items} message={errorMsg} isLoading={isLoading} />
    </div>
  )
}

export default withRouter(Home)
