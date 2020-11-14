const wordsCount = (str) => {
  let length = 0
  for (let v of new ItObj(str)) {
    length++
  }
  return length + 1
}
const getWords = (str) => {
  return new ItObj(str)
}

class ItObj {
  constructor(str) {
    this.str = str
    return this._init()
  }
  _init() {
    let str = this.str.trim().replace(/\s{2,}/g, ' ')
    let start = 0
    let flag = false
    return {
      oldValue: this.str,
      newValue: str,
      [Symbol.iterator]: function () {
        let res
        return {
          next() {
            if (flag) {
              res = { done: true }
            } else {
              str.indexOf(' ', start) === -1 && (flag = true)
              res = {
                done: false,
                value: str.slice(start, str.indexOf(' ', start)),
              }
              start = str.indexOf(' ', start) + 1
            }
            return res
          },
        }
      },
    }
  }
}

export { wordsCount, getWords }
