const parseAuthor = require('parse-author')
const gravatarUrl = require('gravatar-url')

function expandAuthor (authorValue) {
  if (typeof authorValue === 'string') {
    const author = parseAuthor(authorValue)
    if (author.email) author.avatar = gravatarUrl(author.email, { size: 512 })
    return clean(author)
  }
  return clean(authorValue)
}

function clean (author) {
  const cleanAuthor = {}
  if (author.name) cleanAuthor.name = author.name
  if (author.url) cleanAuthor.url = author.url
  if (author.avatar) cleanAuthor.avatar = author.avatar
  return cleanAuthor
}

module.exports = expandAuthor
