import React, { useState, useEffect } from "react"
import Catalog from "../Components/Catalog/Catalog"
import Api from "../Lib/Api"

export default function Deals() {
  const [items, setItems] = useState([])
  useEffect(function () {
    async function fetchData() {
      try {
        let items = await Api.getDeals()
        setItems(items)
      } catch (error) {
        return error
      }
    }
    fetchData()
  }, [])
  return (
    <div>
      <Catalog items={items} message="Currenlty no deals" />
    </div>
  )
}
