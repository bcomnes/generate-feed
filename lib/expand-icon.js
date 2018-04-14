const parseAuthor = require('parse-author')
const gravatarUrl = require('gravatar-url')
const expandURL = require('./expand-url')

module.exports = function expandIcon (config, field, size) {
  if (config[field]) return expandURL(config[field], config.url)
  if (!config.author) return null

  const author = typeof config.author === 'string' ? parseAuthor(config.author) : config.author
  if (!author.email) return
  return gravatarUrl(author.email, {size: size})
}
