// types
const makeLog = require('./types/log') // simple log type
const raw = require('./types/raw') // cleaned raw jsonFeed'
const makeMd = require('./types/md') // cleaned raw jsonFeed'

function makeDispatch (config) {
  const types = {
    log: makeLog(config),
    md: makeMd(config),
    raw
  }

  const typeDispatch = new Proxy(types, {
    get: (types, type) => {
      if (type === 'undefined') return types.log
      if (!(type in types)) {
        throw new Error('generate-feed: Missing type "' + type + '"')
      }
      return types[type]
    }
  })

  return typeDispatch
}

module.exports = makeDispatch
