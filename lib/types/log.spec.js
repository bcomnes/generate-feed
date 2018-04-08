const test = require('tape')
const makeLog = require('./log')
const config = {
  'title': 'bret.io log',
  'url': 'https://bret.io',
  'description': 'A running log of announcements, projects and accomplishments.',
  'icon': '/icon-512x512.png',
  'favicon': '/favicon-64x64.png',
  'author': 'Bret Comnes <bcomnes@gmail.com> (https://bret.io)',
  'avatar': '/avatar-512x512.png'
}
const log = makeLog(config)

test('log: with html', t => {
  const item = {
    'date': '2018-04-07T15:06:43-07:00',
    'content': '<p>Hello, world!</p>',
    'title': 'This is a blog title',
    'url': '/my-blog-post',
    'link': 'https://example.com/some-external-link'
  }

  const jf = log(item, config)

  t.equal(jf.url, 'https://bret.io/my-blog-post', 'url')
  t.equal(jf.external_url, item.link, 'external_url')
  t.equal(jf.content_html, item.content, 'content_html')
  t.equal(jf.content_text, undefined, '!content_text')
  t.equal(jf.date_published, '2018-04-07T22:06:43.000Z', 'date_published')
  t.equal(jf.title, item.title, 'title')
  console.log(jf)
  t.end()
})

test('log: with text', t => {
  const item = {
    'date': '2018-04-07T15:06:43-07:00',
    'content': 'No html, just some text',
    'title': 'This is a blog title',
    'url': '/my-blog-post'
  }

  const jf = log(item, config)

  t.equal(jf.url, 'https://bret.io/my-blog-post', 'url')
  t.equal(jf.external_url, item.link, 'external_url')
  t.equal(jf.content_html, undefined, '!content_html')
  t.equal(jf.content_text, item.content, 'content_text')
  t.equal(jf.date_published, '2018-04-07T22:06:43.000Z', 'date_published')
  t.equal(jf.title, item.title, 'title')
  console.log(jf)
  t.end()
})

test('log: with no title', t => {
  const item = {
    'date': '2018-04-07T15:06:43-07:00',
    'content': 'No html, just some text',
    'url': '/my-blog-post'
  }

  const jf = log(item, config)

  t.equal(jf.url, 'https://bret.io/my-blog-post', 'url')
  t.equal(jf.content_html, undefined, '!content_html')
  t.equal(jf.content_text, item.content, 'content_text')
  t.equal(jf.date_published, '2018-04-07T22:06:43.000Z', 'date_published')
  t.equal(jf.title, undefined, 'title')
  console.log(jf)
  t.end()
})

test('log: all fields', t => {
  const item = {
    'date': '2018-04-07T15:06:43-07:00',
    'title': 'Ahh yes, a title',
    'modified': '2018-04-08T17:31:18Z',
    'content': 'No html, just some text',
    'url': '/my-blog-post',
    'link': '/some-other-link',
    'id': 'a-custom-id',
    'summary': 'hey look a summary',
    'image': '/some/image.png',
    'banner_image': '/some/banner_image.png',
    'author': 'Some Guy <someguy@gmail.com> (https://someguy.com)',
    'tags': ['some', 'tags', 'as', 'well', 200],
    'attachments': [
      {
        'url': '/relative/attatchment.mp3',
        'mime_type': 'audio/mpeg',
        'title': 'relative',
        'size_in_bytes': 500000,
        'duration_in_seconds': 200
      },
      {
        'url': 'https://example.com/external/attatchment.mp3',
        'mime_type': 'audio/mpeg',
        'title': 'external',
        'size_in_bytes': 2000,
        'duration_in_seconds': 200,
        an_extra_field: 'foo-bar'
      }
    ]
  }

  const jf = log(item, config)

  t.equal(jf.url, 'https://bret.io/my-blog-post', 'url')
  t.equal(jf.content_html, undefined, '!content_html')
  t.equal(jf.content_text, item.content, 'content_text')
  t.equal(jf.date_published, '2018-04-07T22:06:43.000Z', 'date_published')
  t.equal(jf.title, item.title, 'title')
  t.equal(jf.attachments[1].an_extra_field, undefined, 'clean attatchments')
  console.log(jf)
  t.end()
})
