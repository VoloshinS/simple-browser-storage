let UserExpection = message => {
  return {
    message: message,
    name: 'UserExpection'
  }
}

let dateToMins = (date) => {
  let d = date ? new Date(date) : new Date()

  return d.getTime() / 60 / 1000
}

let extend = (defaults, options) => {
  let prop,
    extended = {}


  for (prop in defaults) {
    if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
      extended[prop] = defaults[prop]
    }
  }

  for (prop in options) {
    if (Object.prototype.hasOwnProperty.call(options, prop)) {
      extended[prop] = options[prop]
    }
  }

  return extended
}

export default {
  UserExpection: UserExpection,
  dateToMins: dateToMins,
  extend: extend
}
