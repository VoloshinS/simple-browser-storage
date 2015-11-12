import LocalStorage from './LocalStorage'
import CookieStorage from './CookieStorage'

let hasLocalStorage = (() => {
  try {
    let mod = 'test'
    localStorage.setItem(mod, mod)
    localStorage.removeItem(mod)
    return true
  }
  catch (exception) {
    return false
  }
}())

export default opts => {
  if (hasLocalStorage) {
    return new LocalStorage(opts)
  }
  else {
    return new CookieStorage(opts)
  }
}
