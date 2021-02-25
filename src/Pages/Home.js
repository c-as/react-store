import React, { Component } from "react"
import Catalog from "../Components/Catalog/Catalog"
import Api from "../Lib/Api"

export default class Home extends Component {
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
    try {
      let items = await Api.getItems()
      this.setState({ items: items })
    } catch (error) {
      return error
    }
  }
}
//     }

//     fetchData()
//   })
//   return (
//     <div>
//       <Catalog items={items} />
//     </div>
//   )
// }
