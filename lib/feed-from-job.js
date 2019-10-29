const generateFeed = require('./generate-feed')

function createFeedFromJob (config) {
  function feedFromJob (job, cb) {
    generateFeed(job.name, Object.assign({ file: job.file }, config), job.items, job.next, (err, feed) => {
      if (err) return cb(err)
      return cb(null, Object.assign(job, { feed }))
    })
  }
  return feedFromJob
}

module.exports = createFeedFromJob
