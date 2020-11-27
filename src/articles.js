import * as serverApi from './db'

const all = async () => await cb(serverApi.all)

const one = async (id) => (await cb(serverApi.get, id)).data

const remove = async (id) => (await cb(serverApi.remove, id)).data

async function cb(f, id = null) {
  try {
    let info = JSON.parse(typeof f === 'function' ? await f(id) : await f)
    return +info.code === 200 ? info : info.status
  } catch (e) {
    throw e
  }
}

export { all, one, remove }
