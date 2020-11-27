const SICRET_KEY = '991912ac966a68d2e79437171700dd01'


class MakeRequest {
  constructor(baseURL, options ) {
    this.baseURL = baseURL
    this.options = options
    console.log(this);
  }
  async #request(url) {
    const URL = this.baseURL + url
    let res = await fetch(URL, this.options)
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
  async post(url,body) {
    this.options.method = 'POST' 
    this.options.body = body
    return this.#request(url)
  }
}

const http = new MakeRequest('/js-hw-api/', {
  headers: { 'Autorization': SICRET_KEY },
})



export default http 

