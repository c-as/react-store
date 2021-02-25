import React, { Component } from "react"
import Catalog from "../Components/Catalog/Catalog"
import Api from "../Lib/Api"

export default class Deals extends Component {
  state = { items: [] }
  render() {
    return (
      <div>
        <Catalog items={this.state.items} message="Currenlty no deals" />
      </div>
    )
  }
  async componentDidMount() {
    try {
      let items = await Api.getDeals()
      this.setState({ items: items })
    } catch (error) {
      return error
    }
  }
}
