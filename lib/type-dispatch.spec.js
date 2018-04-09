const test = require('tape')
const makeTypeDispatch = require('./type-dispatch')

const config = {
  'title': 'bret.io log',
  'url': 'https://bret.io',
  'description': 'A running log of announcements, projects and accomplishments.',
  'icon': '/icon-512x512.png',
  'favicon': '/favicon-64x64.png',
  'author': 'Bret Comnes <bcomnes@gmail.com> (https://bret.io)',
  'avatar': '/avatar-512x512.png'
}

const typeDispatch = makeTypeDispatch(config)

test('type-dispatch: types are exported correctly', t => {
  t.equal(typeDispatch.log.name, 'log', 'log exported')
  t.equal(typeDispatch.raw.name, 'raw', 'raw exported')
  t.equal(typeDispatch[undefined].name, 'log', 'default type is log')
  t.throws(() => { return typeDispatch.notset }, /Missing type "notset"/, 'missing types throw')

  t.end()
})
