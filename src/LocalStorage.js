import Storage from './Storage'

class LocalStorage extends Storage {
  constructor(options) {
    super(options)
    this.storeType = 'localStorage'
  }

  updateState(valueObj) {
    let updatedState = super.updateState(valueObj)
    localStorage.setItem(this.name, JSON.stringify(updatedState))
  }

  getState() {
    return JSON.parse(localStorage.getItem(this.name))
  }
}

export default LocalStorage
