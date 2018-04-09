const makeTypeDispatch = require('./type-dispatch')
const ensureID = require('./ensure-id')
const nodeURL = require('./url')
const expandURL = require('./expand-url')

function generateFeed (name, config, items, next) {
  if (!config.title) throw new Error('generate-feed: missing title in config')

  const jf = {
    version: 'https://jsonfeed.org/version/1'
  }

  if (config.url) jf.home_page_url = config.url
  if (config.url) jf.feed_url = nodeURL.resolve(config.url, name + '.json')
  if (config.description) jf.description = config.description
  if (config.user_comment) jf.user_comment = config.user_comment
  if (next) jf.next_url = nodeURL.resolve(config.url, next + '.json')
  if (config.icon) jf.icon = expandURL(config.icon, config.url)
  if (config.favicon) jf.icon = expandURL(config.icon, config.url)

  const td = makeTypeDispatch(config)
  const jfItems = items.map(item => {
    const i = Object.assign({}, item)
    const type = i.type
    delete i.type

    return ensureID(td[type])
  })
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
