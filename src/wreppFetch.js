export default class MakeRequest {
  constructor(baseURL, options) {
    this.baseURL = baseURL
    this.options = options
  }
  async #request(url, options = null) {
    const URL = this.baseURL + url
    let res = await fetch(
      URL,
      options ? { ...this.options, ...options } : this.options
    )
    if (res.status === 200) {
      return res.json()
    }
    let text = await res.text()
    throw new Error(text)
  }
  async get(url) {
    this.options.method = 'GET'
    return this.#request(url)
  }
  async delete(url) {
    this.options.method = 'DELETE'
    return this.#request(url)
  }
  async post(url, body) {
    let options = { method: 'POST', body }
    return this.#request(url, options)
  }
  async put(url, body) {
    let options = { method: 'PUT', body: JSON.stringify(body) }
    return this.#request(url, options)
  }
}
