/* globals describe, it, beforeEach, afterEach, expect */

import LocalStorage from '../src/LocalStorage'

const defaultOtps = {
  name: 'SimpleBrowserStorage',
  expiresTime: 10
}

describe('Simple browser storage', () => {
  describe('Initialization', () => {
    describe('options is not set', () => {
      let storage

      beforeEach(() => {
        storage = new LocalStorage()
      })

      afterEach(() => {
        localStorage.removeItem(defaultOtps.name)
        storage = null
      })

      it('sets default Storage Name', () => {
        let storageState = localStorage.getItem(defaultOtps.name)
        expect(storageState).not.toBe(null)
      })

      it('sets expires time to 10 minutes', () => {
        expect(storage.expiresTime).toBe(defaultOtps.expiresTime)
      })
    })

    describe('options is set', () => {
      let storage,
        opts = {name: 'TestStore', expiresTime: 20}

      beforeEach(() => {
        storage = new LocalStorage(opts)
      })

      afterEach(() => {
        localStorage.removeItem(opts.name)
        storage = null
      })

      it('sets name from options', () => {
        let storageState = localStorage.getItem(opts.name)

        expect(storageState).not.toBe(null)
      })

      it('sets expires time from options', () => {
        expect(storage.expiresTime).toBe(opts.expiresTime)
      })
    })
  })

  describe('#setState', () => {
    let storage

    beforeEach(() => {
      storage = new LocalStorage()
    })

    afterEach(() => {
      localStorage.removeItem(defaultOtps.name)
      storage = null
    })

    it('adds new state attributes to current state', () => {
      let newStateAttr = { test1: 'val1' }

      storage.setState(newStateAttr)

      expect(storage.getState().test1).toEqual(newStateAttr.test1)
      expect(storage.getState().expires).toBeTruthy()
    })

    it('udpates already presented attributes of current state', () => {
      let oldStateAttrs = { test1: 'val1', test2: 'val2' }
      storage.setState(oldStateAttrs)
      let newStateAttrs = { test1: 'val1updated' }
      storage.setState(newStateAttrs)

      expect(storage.getState().test1).toEqual(newStateAttrs.test1)
      expect(storage.getState().test2).toEqual(oldStateAttrs.test2)
    })
  })
})
