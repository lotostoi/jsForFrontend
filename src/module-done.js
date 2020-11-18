function watchObj(node, callback) {
  return new Proxy(node, {})
}

class EmailParser {
  constructor(email) {
    this.email = email
  }
  set email(val) {
    let { _name, _domain, _isCorrect } = this
    _isCorrect = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(
      val
    )
	_isCorrect ? ([_name, _domain] = val.split('@')) : ([_name, _domain] =[0,0])
	console.log(_name, _domain);
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
