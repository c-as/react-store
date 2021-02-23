const api = {
  async getItems() {
    let response = await fetch("https://gp-super-store-api.herokuapp.com/item/list")
    return (await response.json()).items
  },
  async getDeals() {
    return (await this.getItems()).filter(this.isDeal)

  },
  isDeal(item) {
    return item.isOnSale
  }
}

export default api