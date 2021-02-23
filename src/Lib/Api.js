const api = {
  async getItems() {
    let response = await fetch("https://gp-super-store-api.herokuapp.com/item/list")
    return (await response.json()).items
  },
  async getDeals() {
    return (await this.getItems()).filter(this.isDeal)

  },
  async getItem(id) {
    let response = await fetch(`https://gp-super-store-api.herokuapp.com/item/${id}`)
    return (await response.json())
  },
  isDeal(item) {
    return item.isOnSale
  }
}

export default api