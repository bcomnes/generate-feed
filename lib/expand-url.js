const nodeURL = require('url')

function expandURL (itemURL, baseURL) {
  // TODO: Get rid of old UI behavior
  const itemURLObj = nodeURL.parse(itemURL) /* eslint-disable-line n/no-deprecated-api */
  const baseURLObj = nodeURL.parse(baseURL) /* eslint-disable-line n/no-deprecated-api */
  if (itemURLObj.hostname) return itemURLObj.format()
  if (baseURLObj.hostname) {
    return nodeURL.resolve(baseURL, itemURL) /* eslint-disable-line n/no-deprecated-api */
  }
  return itemURLObj.format()
}

module.exports = expandURL
