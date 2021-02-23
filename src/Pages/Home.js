import React, { Component } from 'react'
import Catalog from "../Components/Catalog/Catalog"
import Api from "../Lib/Api"

export default class Items extends Component {
  constructor() {
    super()
    this.state = {
      items: []
    }
  }
  render() {
    return (
      <div>
        <Catalog items={this.state.items} />
      </div>
    )
  }
  async componentDidMount() {
    let items = await Api.getItems();
    this.setState({ items: items })
  }
}
