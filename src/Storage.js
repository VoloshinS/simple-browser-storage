import { UserExpection, dateToMins, extend, addMinutes } from './utils'

class Storage {
  constructor(options) {
    let opts = options || {}
    this.name = opts.name || 'SimpleBrowserStorage'
    this._expiresTime = opts.expiresTime || 10

    let updatedState = this.stateIsExpired() ? {} : this.getState()
    updatedState.expires = addMinutes(new Date(), this._expiresTime)
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
      valueObj.expires = addMinutes(new Date(), this._expiresTime)
    }
    return valueObj
  }

  stateIsExpired() {
    let state = this.getState() || {}

    if (!state.expires) { return true }

    let expires = dateToMins(state.expires),
      isExpired = dateToMins() > expires
    return isExpired
  }
}

export default Storage
