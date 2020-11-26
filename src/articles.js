const SICRET_KEY = '991912ac966a68d2e79437171700dd01'

function makeRequest(url, options) {
  return fetch(url, options).then((response) => {
    if (response.status === 200) {
      return response.json()
    }

    return response.text().then((e) => {
      throw new Error(e)
    })
  })
}

export function all() {
  return makeRequest('/js-hw-api/articles.php', { headers: { 'Autorization': SICRET_KEY } })
}

export function one(id) {
  return makeRequest(`/js-hw-api/articles.php?id=${id}`, { headers: { 'Autorization': SICRET_KEY } })
}

export function add(title, content) {
  let body = new FormData()
  body.append('title', title)
  body.append('content', content)

  return makeRequest(`/js-hw-api/articles.php`, {
    method: 'POST',
    body,
  })
}
