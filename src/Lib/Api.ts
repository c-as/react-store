export const url = "https://gp-super-store-api.herokuapp.com"

export interface ProductInterface {
  _id: string
  avgRating: number
  description: string
  imageUrl: string
  isOnSale: boolean
  name: string
  price: number
  stockCount: number
}

export interface List {
  hasMore: boolean
  products: ProductInterface[]
  next: any
  total: number
}

async function fetchJson(query: string): Promise<any> {
  try {
    const response = await fetch(query)
    if (!(response.status >= 200 && response.status < 300)) {
      throw Error(`Could not fetch '${query}', error code ${response.status}`)
    }
    const json = await response.json()
    json.products = json.items
    return json
  } catch (error) {
    throw error
  }
}

async function fetchList(params: string) {
  try {
    return await fetchJson(`${url}/item/list/${params}`).then(
      (data) => data as List
    )
  } catch (error) {
    throw error
  }
}

async function fetchProduct(id: string) {
  try {
    return await fetchJson(`${url}/item/${id}`).then(
      (data) => data as ProductInterface
    )
  } catch (error) {
    throw error
  }
}

export { fetchList, fetchProduct }
