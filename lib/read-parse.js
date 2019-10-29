const waterfall = require('run-waterfall')
const fs = require('fs')

function readParse (job, done) {
  waterfall([
    (cb) => {
      fs.readFile(job.file, 'utf8', cb)
    },
    (data, cb) => {
      let items
      try {
        items = JSON.parse(data)
      } catch (e) {
        return cb(e)
      }
      const jobWithItems = Object.assign(job, { items })
      cb(null, jobWithItems)
    }
  ], (err, jobWithItems) => {
    if (err) return done(err)
    done(null, jobWithItems)
  })
}

module.exports = readParse
