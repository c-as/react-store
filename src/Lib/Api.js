export const url = "https://gp-super-store-api.herokuapp.com"

async function fetchJson(query) {
  try {
    const response = await fetch(query)
    const json = await response.json()
    return json
  } catch (error) {
    console.log(error)
    throw error
  }
}

async function fetchList(params) {
  try {
    return await fetchJson(`${url}/item/list/${params}`)
  } catch (error) {
    throw error
  }
}

async function fetchItem(id) {
  try {
    return await fetchJson(`${url}/item/${id}`)
  } catch (error) {
    throw error
  }
}

export { fetchList, fetchItem }
