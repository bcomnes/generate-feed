const isHTML = require('is-html')
const ensureID = require('../../ensure-id')
const expandURL = require('../../expand-url')
const expandAuthor = require('../../expand-author')
const generateTitle = require('./generate-title')

function makeLog (config) {
  return log
  function log (item) {
    if (!item) throw new Error('log: missing item object')
    if (!config) throw new Error('log: missing config object')
    item = Object.assign({}, item)
    const jf = {}

    if (item.date) jf.date_published = normalizeDate(item.date)

    if (item.content) {
      if (isHTML(item.content)) {
        jf.content_html = item.content
      } else {
        jf.content_text = item.content
      }
    }

    jf.title = generateTitle(item)

    if (item.modified) jf.date_modified = normalizeDate(item.modified)

    if (item.url) {
      jf.url = expandURL(item.url, config.url)
    }

    if (item.link) {
      jf.external_url = expandURL(item.link, config.url)
    }

    if (item.image) jf.image = expandURL(item.image, config.url)
    if (item.banner_image || item.bannerImage) jf.banner_image = expandURL(item.banner_image || item.bannerImage, config.url)

    if (item.author) jf.author = expandAuthor(item.author)

    if (item.id) jf.id = item.id
    if (item.summary) jf.summary = item.summary

    if (item.tags && Array.isArray(item.tags)) jf.tags = item.tags
    if (item.attachments && Array.isArray(item.attachments)) {
      jf.attachments = item.attachments.map(cleanAttachment)
    }

    // extensions
    Object.getOwnPropertyNames(item).filter(prop => prop.startsWith('_')).forEach(prop => {
      jf[prop] = item[prop]
    })

    return ensureID(jf)

    function cleanAttachment (attachment) {
      if (!attachment.url) throw new Error('log: missing url - ' + JSON.stringify(attachment).slice(0, 50) + '...')
      if (!attachment.mime_type) throw new Error('log: missing mime_type - ' + JSON.stringify(attachment).slice(0, 50) + '...')
      const clean = {}
      clean.url = expandURL(attachment.url, config.url)
      clean.mime_type = attachment.mime_type
      if (attachment.title) clean.title = attachment.title
      if (attachment.size_in_bytes) clean.size_in_bytes = attachment.size_in_bytes
      if (attachment.duration_in_seconds) clean.duration_in_seconds = attachment.duration_in_seconds
      return clean
    }
  }
}

module.exports = makeLog

function normalizeDate (date) {
  var d = new Date(date)
  return d.toISOString()
}

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
