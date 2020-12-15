import axios from 'axios'
import { Form } from './addTools'
import { setTokens, cleanTokensData } from './tokens'
import Fingerprint2 from 'fingerprintjs2'
const instance = axios.create({
  baseURL: '/js-normal-api/',
  timeout: 10000,
})

async function fp() {
  return new Promise(async (res) => {
    let cb = async () => Fingerprint2.getV18({}, res)
    if (window.requestIdleCallback) {
      requestIdleCallback(cb)
    } else {
      setTimeout(cb, 500)
    }
  })
}

instance.interceptors.request.use(addAuthToken)
instance.interceptors.request.use(packPostBody)
instance.interceptors.response.use(parseResponse, errorResponse)

export default instance

function addAuthToken(request) {
  if (
    localStorage.getItem('accessToken') &&
    localStorage.getItem('refreshToken') &&
    request.url.trim() !== 'auth/refresh/refresh.php'
  ) {
    request.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken')
  }
  return request
}

async function packPostBody(request) {
  if (request.method === 'post' && !(request.data instanceof FormData)) {
    let data = new FormData()
    for (let name in request.data) {
      data.append(name, request.data[name])
    }
    request.data = data
  } else if (request.data instanceof FormData) {
    if (request.url.trim() === 'auth/login.php') {
      let deviceID = await fp()
      request.data.append('deviceID', deviceID)
    }
  }
  return request
}

function parseResponse(response) {
  if (response.status === 200) {
    return response.data
  }
  return response
}

// честно говоря не знаю насколько адекватно это решение, как тестировать тоже не очень понятно.
let flag = false
let refresh = () =>
  new Promise(async (resolve) => {
    flag = true
    let deviceID = await fp()
    let result = await instance.put(`auth/refresh/refresh.php`, deviceID)
    resolve(result)
  })

async function errorResponse(error) {
  if (error.response.status === 401) {
    if (!flag) {
      let { res, accessToken } = await refresh()
      if (!res) {
        Form.show()
        cleanTokensData()
      } else {
        setTokens(accessToken)
        let data = await instance(error.response.config)
        return data
      }
    }
    flag = false
  }
}
