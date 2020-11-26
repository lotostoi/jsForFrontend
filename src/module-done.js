const mailRegExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/

function watchObj(node, callback) {
    function f (node, callback) {
    return new Proxy(node, {
      get(target, prop) {
        if (typeof target[prop] === 'function') target[prop] = target[prop].bind(target)
        return f(target[prop], callback)
      },
      set(target, prop, val) {
        target[prop] = val
        callback(prop, val)
        return true
      },
    })
  }
  return f(node, callback)
}

class EmailParser {
  constructor(email) {
    this.email = email
  }
  set email(val) {
    let name, domain, isCorrect
    isCorrect = mailRegExp.test(val)
    isCorrect && ([name, domain] = val.split('@'))
    this._isCorrect = isCorrect
    this._name = name || null
    this._domain = domain || null
    return true
  }
  get isCorrect() {
    return this._isCorrect
  }
  get name() {
    return this._name
  }
  get domain() {
    return this._domain
  }
}

export { watchObj, EmailParser }
