const hash = require('object-hash')

// Generate an ID for a jsonfeed like object
module.exports = function ensureId (i) {
  // process JSON feed items to ensuire id's
  if (i.id) return i

  const url = i.url || i.external_url
  const date = i.date_published || i.date_modified

  if (url && date) {
    i.id = [url, date].join('-')
    return i
  }
  if (url) {
    i.id = url
    return i
  }
  if (date) {
    i.id = date
    return i
  }
  i.id = hash(i)
  return i
}
