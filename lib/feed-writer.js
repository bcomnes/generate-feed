const fromString = require('from2-string')
const parallel = require('run-parallel')
const path = require('path')
const pump = require('pump')
const fs = require('fs')

function makeFeedWriter (config, outputPath) {
  function feedWriter (job, enc, cb) {
    parallel([
      cb => {
        const writePath = path.join(outputPath, job.name + '.json')
        const ws = fs.createWriteStream(writePath)
        let readStream
        try {
          readStream = fromString(JSON.stringify(job.feed, null, ' '))
        } catch (e) {
          return process.nextTick(cb, e)
        }
        pump(readStream, ws, cb)
      },
      cb => {
        const writePath = path.join(outputPath, job.name + '.xml')
        const ws = fs.createWriteStream(writePath)
        const readStream = fromString(job.atom)
        pump(readStream, ws, cb)
      }
    ], cb)
  }

  return feedWriter
}

module.exports = makeFeedWriter
