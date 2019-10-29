const generateAtomFeed = require('./lib/generate-atom')
const feedFromJob = require('./lib/feed-from-job')
const jobsCreator = require('./lib/jobs-creator')
const feedWriter = require('./lib/feed-writer')
const transform = require('parallel-transform')
const readParse = require('./lib/read-parse')
const writer = require('flush-write-stream')
const fromArray = require('from2-array')
const mkdirp = require('mkdirp')
const pump = require('pump')

function processFiles (config, logMap, dest, cb) {
  const jobsStream = fromArray.obj(jobsCreator(logMap))
  const parseStream = transform(10, { objectMode: true }, readParse)
  const generateFeedStream = transform(10, { objectMode: true }, feedFromJob(config))
  const generateAtomStream = transform(10, { objectMode: true }, generateAtomFeed)
  const writeFeeds = writer({ objectMode: true }, feedWriter(config, dest))
  mkdirp(dest, (err) => {
    if (err) return cb(err)
    pump(jobsStream, parseStream, generateFeedStream, generateAtomStream, writeFeeds, cb)
  })
}

module.exports = processFiles
