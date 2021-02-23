import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import Api from "../Lib/Api"

class Item extends Component {
  constructor() {
    super()
    this.state = {
      id: null,
      item: null,
    }
  }
  render() {
    return (
      <div>
        {JSON.stringify(this.state.item)}
      </div>
    )
  }
  async componentDidMount() {
    let split = this.props.location.pathname.split("/")
    await this.setState({ id: split[split.length - 1] })

    let item = await Api.getItem(this.state.id)
    await this.setState({ item: item })
  }
}

export default withRouter(Item)

