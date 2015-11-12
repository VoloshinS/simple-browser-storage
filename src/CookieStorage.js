import Storage from './Storage'

let cookieExpireDate = minutes => {
  let d = new Date(),
    minToMsec = minutes * 60 * 1000

  d.setTime(d.getTime() + minToMsec)

  return d.toUTCString()
}

class CookieStorage extends Storage {
  constructor(options) {
    super(options)
    this.storeType = 'cacheStorage'
  }

  updateState(valueObj) {
    let updatedState = super.updateState(valueObj),
      expires = 'expires=' + cookieExpireDate(this.expiresTime),
      cookie = [this.name, '=', escape(JSON.stringify(updatedState)), ';', expires].join('')

    document.cookie = cookie
  }

  getState() {
    let result = document.cookie.match(new RegExp(this.name + '=([^;]+)'))
    return result ? JSON.parse(unescape(result[1])) : result
  }
}

export default CookieStorage
