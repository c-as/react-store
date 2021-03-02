import React, { useState, useEffect } from "react"
import Catalog from "../Components/Catalog/Catalog"
import Api from "../Lib/Api"

export default function Deals() {
  const [items, setItems] = useState([])
  const [errorMsg, setErrorMsg] = useState()
  const [isLoading, setLoading] = useState(true)

  useEffect(function () {
    async function fetchData() {
      try {
        let items = await Api.getDeals()
        setItems(items)
      } catch (error) {
        setErrorMsg("Could not fetch deals")
        return error
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <Catalog
        items={items}
        message={errorMsg ? errorMsg : "Currenlty no deals"}
        isLoading={isLoading}
      />
    </div>
  )
}
