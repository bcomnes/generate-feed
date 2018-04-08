const ensureID = require('../ensure-id')

function raw (item) {
  if (!item) throw new Error('log: missing item object')
  item = Object.assign({}, item)
  const jf = {}

  if (item.id) jf.id = item.id
  if (item.url) jf.url = item.url
  if (item.external_url) jf.external_url = item.link
  if (item.title) jf.title = item.title
  if (item.content_html) jf.content_html = item.content_html
  if (item.content_text) jf.content_text = item.content_text
  if (item.summary) jf.summary = item.summary
  if (item.image) jf.image = item.image
  if (item.banner_image) jf.banner_image = item.banner_image
  if (item.date_published) jf.date_published = item.date_published
  if (item.date_modified) jf.date_modified = item.date_modified
  if (item.author) jf.author = item.author
  if (item.tags) jf.tags = item.tags
  if (item.attachments) jf.attachments = item.attachments
  // extensions
  Object.getOwnPropertyNames(item).filter(prop => prop.startsWith('_')).forEach(prop => {
    jf[prop] = item[prop]
  })

  return ensureID(jf)
}

module.exports = raw

/*  jsonfeed reference
    https://jsonfeed.org/version/1

    id (required)
    url
    external_url (very optional)
    title
    content_text
    content_html
    summary
    image
    banner_image
    date_published RFC 3339 2010-02-07T14:04:00-05:00
    date_modified RFC 3339 2010-02-07T14:04:00-05:00
    author {
      name
      url
      avatar
    }
    tags []
    attachments [
      {
        url (required)
        mime_type (required)
        title
        size_in_bytes
        duration_in_seconds
      }
    ]

    _any_extension {
      about - description of extension
      whatever you want
    }

   */
