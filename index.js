const generateAtomFeed = require('./lib/generate-atom')
const feedFromJob = require('./lib/feed-from-job')
const jobsCreator = require('./lib/jobs-creator')
const feedWriter = require('./lib/feed-writer')
const transform = require('parallel-transform')
const readParse = require('./lib/read-parse')
const writer = require('flush-write-stream')
const fromArray = require('from2-array')
const pump = require('pump')
const { mkdir } = require('fs/promises')

function processFiles (config, logMap, dest, cb) {
  const jobsStream = fromArray.obj(jobsCreator(logMap))
  const parseStream = transform(10, { objectMode: true }, readParse)
  const generateFeedStream = transform(10, { objectMode: true }, feedFromJob(config))
  const generateAtomStream = transform(10, { objectMode: true }, generateAtomFeed)
  const writeFeeds = writer({ objectMode: true }, feedWriter(config, dest))
  console.log(dest)
  mkdir(dest, { recursive: true }).then(() => {
    pump(jobsStream, parseStream, generateFeedStream, generateAtomStream, writeFeeds, cb)
  }).catch(cb)
}

module.exports = processFiles
