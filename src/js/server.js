import axios from 'axios'
import { Form } from './addTools'
import { setTokens, cleanTokensData } from './tokens'
const instance = axios.create({
  baseURL: '/js-normal-api/',
  timeout: 10000,
})

instance.interceptors.request.use(addAuthToken)
instance.interceptors.request.use(packPostBody)
instance.interceptors.response.use(parseResponse, errorResponse)

export default instance

function addAuthToken(request) {
  if (localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')) {
    request.headers.Authorization =
      request.url.trim() === 'auth/refresh/refresh.php' ? '' : 'Bearer ' + localStorage.getItem('accessToken')
  }
  return request
}

function packPostBody(request) {
  if (request.method === 'post' && !(request.data instanceof FormData)) {
    let data = new FormData()
    for (let name in request.data) {
      data.append(name, request.data[name])
    }

    request.data = data
  }
  return request
}

function parseResponse(response) {
  if (response.status === 200) {
    return response.data
  }
  return response
}

async function errorResponse(error) {
  if (error.response.status === 401) {
    let { res, accessToken } = await instance.put('auth/refresh/refresh.php', {deviceID: 'test'})
    if (!res) {
      Form.show()
      cleanTokensData()
    } else {
      setTokens(accessToken)
      let data = await instance(error.response.config)
      return data
    }
  }
}
