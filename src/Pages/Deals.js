import React, { useState, useEffect } from "react"
import Catalog from "../Components/Catalog/Catalog"
import Api from "../Lib/Api"

export default function Deals() {
  const [items, setItems] = useState([])
  const [errorMsg, setErrorMsg] = useState()

  useEffect(function () {
    async function fetchData() {
      try {
        let items = await Api.getDeals()
        setItems(items)
        setErrorMsg()
      } catch (error) {
        setErrorMsg("Could not fetch deals")
        return error
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <Catalog
        items={items}
        message={errorMsg ? errorMsg : "Currenlty no deals"}
      />
    </div>
  )
}
