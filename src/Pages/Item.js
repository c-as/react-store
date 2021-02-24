import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import Api from "../Lib/Api"

class Item extends Component {
  constructor() {
    super()
    this.state = {
      item: null,
    }
  }
  render() {
    return <div>{JSON.stringify(this.state.item)}</div>
  }
  async componentDidMount() {
    let item = await Api.getItem(this.props.match.params.id)
    await this.setState({ item: item })
  }
}

export default withRouter(Item)
