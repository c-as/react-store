const api = {
  url: "https://gp-super-store-api.herokuapp.com",
  async getItems() {
    try {
      let response = await fetch(`${this.url}/item/list`)
      return (await response.json()).items
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  async getDeals() {
    try {
      let response = await fetch(`${this.url}/item/list?isOnSale=true`)
      return (await response.json()).items
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  async getItem(id) {
    try {
      let response = await fetch(`${this.url}/item/${id}`)
      return await response.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}

export default api
