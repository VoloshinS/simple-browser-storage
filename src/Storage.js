import { UserExpection, dateToMins, extend } from './utils'

class Storage {
  constructor(options) {
    let opts = options || {}
    this.name = opts.name || 'SimpleBrowserStorage'
    this._expiresTime = opts.expiresTime || 10

    let updatedState = this.stateIsExpired() ? {} : this.getState()
    updatedState.expires = new Date()
    this.updateState(updatedState)
  }

  get expiresTime() {
    return this._expiresTime
  }

  setState(valueObj) {
    if (typeof valueObj !== 'object') {
      throw new UserExpection('You can add only objects to state!')
    }
    let curState = this.getState() || {},
      newState = extend(curState, valueObj)
    this.updateState(newState)
  }

  updateState(valueObj) {
    if (valueObj && !valueObj.expires) {
      valueObj.expires = new Date()
    }
    return valueObj
  }

  stateIsExpired() {
    let state = this.getState() || {}

    if (!state.expires) { return true }

    let expires = dateToMins(state.expires),
      isExpired = (dateToMins() - expires) > this._expiresTime
    return isExpired
  }
}

export default Storage
