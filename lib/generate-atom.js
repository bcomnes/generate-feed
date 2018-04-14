const jsonfeedToAtom = require('jsonfeed-to-atom')

function generateAtomFeed (job, cb) {
  let atom
  try {
    atom = jsonfeedToAtom(job.feed)
  } catch (e) {
    return process.nextTick(cb, e)
  }
  process.nextTick(cb, null, Object.assign(job, { atom }))
}

module.exports = generateAtomFeed
