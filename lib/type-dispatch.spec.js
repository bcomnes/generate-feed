const test = require('tape')
const log = require('./types/log')
const raw = require('./types/raw')
const typeDispatch = require('./type-dispatch').typeDispatch

test('type-dispatch: types are exported correctly', t => {
  t.equal(typeDispatch.log, log, 'log exported')
  t.equal(typeDispatch.raw, raw, 'raw exported')
  t.equal(typeDispatch[undefined], log, 'default type is log')
  t.equal(typeDispatch[undefined], log, 'default type is log')

  t.end()
})
