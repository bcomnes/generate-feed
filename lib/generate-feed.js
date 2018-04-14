const nodeURL = require('url')
const ensureID = require('./ensure-id')
const expandAuthor = require('./expand-author')
const makeTypeDispatch = require('./type-dispatch')
const expandIcon = require('./expand-icon')

function generateFeed (name, config, items = [], next) {
  if (!name) throw new Error('generate-feed: missing feed name')
  if (!config) throw new Error('generate-feed: missing configuration object')
  if (!config.title) throw new Error('generate-feed: missing title in config (required)')

  const td = makeTypeDispatch(config)
  const jf = {
    version: 'https://jsonfeed.org/version/1',
    title: config.title
  }
  if (config.url) jf.home_page_url = config.url
  jf.feed_url = expandFeedURL(name, config)
  if (config.description) jf.description = config.description
  if (config.user_comment) jf.user_comment = config.user_comment
  if (next) jf.next_url = expandFeedURL(next, config)
  const expandedIcon = expandIcon(config, 'icon', 512)
  if (expandedIcon) jf.icon = expandedIcon
  const expandedFavicon = expandIcon(config, 'favicon', 64)
  if (expandedFavicon) jf.favicon = expandedFavicon
  if (config.author) jf.author = expandAuthor(config.author)
  if (config.expired) jf.expired = config.expired
  if (config.hubs) jf.hubs = config.hubs

  jf.items = items.map(item => {
    const i = Object.assign({}, item)
    const type = i.type
    delete i.type

    return ensureID(td[type](i))
  })

  return jf
}

module.exports = generateFeed

function expandFeedURL (name, config) {
  if (config.feed_url) {
    return nodeURL.resolve(config.feed_url, name + '.json')
  }
  if (config.url) {
    return nodeURL.resolve(config.url, name + '.json')
  }
  // else
  return nodeURL.resolve('/', name + '.json')
}

/*  jsonfeed reference
    https://jsonfeed.org/version/1

    version (required)
    title (required)
    home_page_url (strongly recommended)
    feed_url
    description
    user_comment
    next_url
    icon 512x512
    favicon 64x64
    author {
      name
      url
      avatar 512x512
    }
    exipred (bool)
    hubs [
      {
        type
        url
      }
    ]
*/
