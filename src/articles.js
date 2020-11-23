import * as serverApi from './db'

const all = async () => await cb(serverApi.all)

const one = async (id) => (await cb(serverApi.get, id)).data

const remove = async (id) => (await cb(serverApi.remove, id)).data

async function cb(f, id = null) {
  try {
    let info = JSON.parse(typeof f === 'function' ? await f(id) : await f)
    return +info.code === 200 ? info : info.status
  } catch (e) {
	  console.log(f);
    throw `when calling function "${f.name}" you have the following: ${e}`
  }
}

export { all, one, remove }
