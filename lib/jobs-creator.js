// fileMap:
// {
//  2016: '/path/to/file,
//  2017: '/path/to/file,
//  2018: '/path/to/file,
// }

function jobsCreator (fileMap) {
  if (!fileMap) throw new Error('generate-feed: a fileMap is required')
  return Object.entries(fileMap).sort(ascending).map(shape)
}

function shape (e, i, entries) {
  const name = i === entries.length - 1 ? 'feed' : e[0]
  const prevFeed = entries[i - 1]
  return {name, file: e[1], year: e[0], next: prevFeed && prevFeed[0]}
}

function ascending (eA, eB) {
  if (eA[0] < eB[0]) return -1
  if (eA.name > eB.name) return 1
  return 0
}

module.exports = jobsCreator
