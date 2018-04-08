const test = require('tape')
const raw = require('./raw')

test('raw: filter out non-specified fields', t => {
  const item = {
    'id': '2',
    'content_text': 'This is a second item.',
    'url': 'https://example.org/second-item',
    someExtraField: 'foo'
  }

  const jf = raw(item)

  t.deepEqual(jf, {
    'id': '2',
    'content_text': 'This is a second item.',
    'url': 'https://example.org/second-item'
  }, 'filtered out extra fields')
  console.log(jf)
  t.end()
})
