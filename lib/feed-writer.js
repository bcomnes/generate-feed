const path = require('path')
const fromString = require('from2-string')
const fs = require('fs')
const pump = require('pump')

function makeFeedWriter (config, outputPath) {
  function feedWriter (job, enc, cb) {
    const writePath = path.join(outputPath, job.name + '.json')
    const ws = fs.createWriteStream(writePath)
    let readStream
    try {
      readStream = fromString(JSON.stringify(job.feed, null, ' '))
    } catch (e) {
      return process.nextTick(cb, e)
    }
    pump(readStream, ws, cb)
  }

  return feedWriter
}

module.exports = makeFeedWriter
