const ensureID = require('./ensure-id')
// types
const log = require('./types/log') // simple log type
const raw = require('./types/raw') // cleaned raw jsonFeed

const types = {
  log,
  raw
}

const typeDispatch = new Proxy(types, {
  get: (obj, prop) => {
    return prop in obj
            ? obj[prop]
            : obj.log
  }
})

function logToItem (log) {
  const i = Object.assign({}, log)
  const type = i.type
  delete i.type

  return ensureID(typeDispatch[type](i))
}

module.exports = logToItem
module.exports.typeDispatch = typeDispatch
