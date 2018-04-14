const test = require('tape')
const generateFeed = require('./generate-feed')

const config = {
  title: 'bret.io log',
  url: 'https://bret.io',
  description: 'A running log of announcements, projects and accomplishments.',
  icon: '/icon-512x512.png',
  favicon: '/favicon-64x64.png',
  author: 'Bret Comnes <bcomnes@gmail.com> (https://bret.io)',
  avatar: '/avatar-512x512.png'
}

const items = [
  {
    date: '2018-04-07T15:06:43-07:00',
    content: '<p>Hello, world!</p>',
    title: 'This is a blog title',
    url: '/my-blog-post',
    link: 'https://example.com/some-external-link'
  },
  {
    date: '2018-04-07T15:06:43-07:00',
    content: 'No html, just some text',
    title: 'This is a blog title',
    url: '/my-blog-post'
  },
  {
    date: '2018-04-07T15:06:43-07:00',
    content: 'No html, just some text',
    url: '/my-blog-post'
  },
  {
    date: '2018-04-07T15:06:43-07:00',
    title: 'Ahh yes, a title',
    modified: '2018-04-08T17:31:18Z',
    content: 'No html, just some text',
    url: '/my-blog-post',
    link: '/some-other-link',
    id: 'a-custom-id',
    summary: 'hey look a summary',
    image: '/some/image.png',
    banner_image: '/some/banner_image.png',
    author: 'Some Guy <someguy@gmail.com> (https://someguy.com)',
    tags: ['some', 'tags', 'as', 'well', 200],
    attachments: [
      {
        url: '/relative/attatchment.mp3',
        mime_type: 'audio/mpeg',
        title: 'relative',
        size_in_bytes: 500000,
        duration_in_seconds: 200
      },
      {
        url: 'https://example.com/external/attatchment.mp3',
        mime_type: 'audio/mpeg',
        title: 'external',
        size_in_bytes: 2000,
        duration_in_seconds: 200,
        an_extra_field: 'foo-bar'
      }
    ]
  }
]

test('generate-feed: no items', t => {
  const jf = generateFeed('feed', config, [], '2017')
  const expectedOutput = {
    'version': 'https://jsonfeed.org/version/1',
    'title': 'bret.io log',
    'home_page_url': 'https://bret.io',
    'feed_url': 'https://bret.io/feed.json',
    'description': 'A running log of announcements, projects and accomplishments.',
    'icon': 'https://bret.io/icon-512x512.png',
    'author': {
      'name': 'Bret Comnes',
      'url': 'https://bret.io',
      'avatar': 'https://gravatar.com/avatar/8d8b82740cb7ca994449cccd1dfdef5f?size=512'
    },
    'items': [],
    'next_url': 'https://bret.io/2017.json'
  }

  t.deepEqual(jf, expectedOutput, 'generates a base json feed document correctly.')
  t.end()
})

test('generate-feed: missing arguments', t => {
  t.throws(() => { generateFeed() }, /missing feed name/, 'throws when missing feed name')
  t.throws(() => { generateFeed('foo') }, /missing configuration object/, 'throws when missing a config object')
  t.throws(() => { generateFeed('foo', {}) }, /missing title in config/, 'throws when config is missing a title')
  let jf
  t.doesNotThrow(() => {
    jf = generateFeed('foo', {title: 'foo bar'})
  }, null, 'generate a minimal json feed with just a title config')
  t.deepEqual(jf, {
    'version': 'https://jsonfeed.org/version/1',
    'title': 'foo bar',
    'feed_url': '/foo.json',
    'items': []
  }, 'minimal meets specification with relative URLs')
  t.end()
})

test('generate-feed: with log items', t => {
  const jf = generateFeed('feed', config, items, '2017')
  const expected = {'version': 'https://jsonfeed.org/version/1', 'title': 'bret.io log', 'home_page_url': 'https://bret.io', 'feed_url': 'https://bret.io/feed.json', 'description': 'A running log of announcements, projects and accomplishments.', 'next_url': 'https://bret.io/2017.json', 'icon': 'https://bret.io/icon-512x512.png', 'author': {'name': 'Bret Comnes', 'url': 'https://bret.io', 'avatar': 'https://gravatar.com/avatar/8d8b82740cb7ca994449cccd1dfdef5f?size=512'}, 'items': [{'date_published': '2018-04-07T22:06:43.000Z', 'content_html': '<p>Hello, world!</p>', 'title': 'This is a blog title', 'url': 'https://bret.io/my-blog-post', 'external_url': 'https://example.com/some-external-link', 'id': 'https://bret.io/my-blog-post-2018-04-07T22:06:43.000Z'}, {'date_published': '2018-04-07T22:06:43.000Z', 'content_text': 'No html, just some text', 'title': 'This is a blog title', 'url': 'https://bret.io/my-blog-post', 'id': 'https://bret.io/my-blog-post-2018-04-07T22:06:43.000Z'}, {'date_published': '2018-04-07T22:06:43.000Z', 'content_text': 'No html, just some text', 'url': 'https://bret.io/my-blog-post', 'id': 'https://bret.io/my-blog-post-2018-04-07T22:06:43.000Z'}, {'date_published': '2018-04-07T22:06:43.000Z', 'content_text': 'No html, just some text', 'title': 'Ahh yes, a title', 'date_modified': '2018-04-08T17:31:18.000Z', 'url': 'https://bret.io/my-blog-post', 'external_url': 'https://bret.io/some-other-link', 'image': 'https://bret.io/some/image.png', 'banner_image': 'https://bret.io/some/banner_image.png', 'author': {'name': 'Some Guy', 'url': 'https://someguy.com', 'avatar': 'https://gravatar.com/avatar/251c028d36ce17f4cc44906df8162693?size=512'}, 'id': 'a-custom-id', 'summary': 'hey look a summary', 'tags': ['some', 'tags', 'as', 'well', 200], 'attachments': [{'url': 'https://bret.io/relative/attatchment.mp3', 'mime_type': 'audio/mpeg', 'title': 'relative', 'size_in_bytes': 500000, 'duration_in_seconds': 200}, {'url': 'https://example.com/external/attatchment.mp3', 'mime_type': 'audio/mpeg', 'title': 'external', 'size_in_bytes': 2000, 'duration_in_seconds': 200}]}]}
  t.deepEqual(jf, expected, 'json feed generates as expected')
  console.log(jf)
  t.end()
})
