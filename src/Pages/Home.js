import React, { useState, useEffect } from "react"
import Catalog from "../Components/Catalog/Catalog"
import Api from "../Lib/Api"

export default function Home() {
  const [items, setItems] = useState([])
  useEffect(function () {
    async function fetchData() {
      try {
        let items = await Api.getItems()
        setItems(items)
      } catch (error) {
        return error
      }
    }
    fetchData()
  }, [])
  return (
    <div>
      <Catalog items={items} />
    </div>
  )
}
