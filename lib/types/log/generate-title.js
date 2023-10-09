const striptags = require('striptags')
const isHTML = require('is-html')

function generateTitle (item) {
  if (item.title) return item.title
  if (item.summary) return truncate(cleanWhitespace(item.summary))
  if (item.content) {
    if (isHTML(item.content)) {
      return truncate(cleanWhitespace(striptags(item.content)))
    }
    return truncate(cleanWhitespace(item.content))
  }
  return item.url || item.link || item.date
}

function cleanWhitespace (summary) {
  return summary.split('\n')[0].trim()
}

function truncate (string) {
  return string.length > 100 ? string.slice(0, 100) + '…' : string
}

module.exports = generateTitle
