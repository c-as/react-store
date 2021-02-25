const api = {
  url: "https://gp-super-store-api.herokuapp.com",
  async getItems() {
    let response = await fetch(`${this.url}/item/list`)
    return (await response.json()).items
  },
  async getDeals() {
    let response = await fetch(`${this.url}/item/list?isOnSale=true`)
    return (await response.json()).items
  },
  async getItem(id) {
    let response = await fetch(`${this.url}/item/${id}`)
    return await response.json()
  },
  isDeal(item) {
    return item.isOnSale
  },
}

export default api
