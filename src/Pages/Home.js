import React, { Component } from "react"
import Catalog from "../Components/Catalog/Catalog"
import Api from "../Lib/Api"

export default class Items extends Component {
  state = {
    items: [],
  }
  render() {
    return (
      <div>
        <Catalog items={this.state.items} />
      </div>
    )
  }
  async componentDidMount() {
    let items
    try {
      items = await Api.getItems()
      this.setState({ items: items })
    } catch (error) {
      this.setState({ message: "Error getting items" })
      return
    }
  }
}
