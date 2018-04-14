const generateFeed = require('./generate-feed')

function createFeedFromJob (config) {
  function feedFromJob (job, cb) {
    let feed
    try {
      feed = generateFeed(job.name, config, job.items, job.next)
    } catch (e) {
      return process.nextTick(cb, e)
    }
    process.nextTick(cb, null, Object.assign(job, { feed }))
  }
  return feedFromJob
}

module.exports = createFeedFromJob
