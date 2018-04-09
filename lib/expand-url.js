const nodeURL = require('url')

function expandURL (itemURL, baseURL) {
  const itemURLObj = nodeURL.parse(itemURL)
  const baseURLObj = nodeURL.parse(baseURL)
  if (itemURLObj.hostname) return itemURLObj.format()
  if (baseURLObj.hostname) {
    return nodeURL.resolve(baseURL, itemURL)
  }
  return itemURLObj.format()
}

module.exports = expandURL
