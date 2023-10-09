const makeLog = require('../log')
const markdownIt = require('markdown-it')
const markdownItSub = require('markdown-it-sub')
const markdownItSup = require('markdown-it-sup')
const markdownItFootnote = require('markdown-it-footnote')
const markdownItDeflist = require('markdown-it-deflist')
const markdownItEmoji = require('markdown-it-emoji')
const markdownItIns = require('markdown-it-ins')
const markdownItMark = require('markdown-it-mark')
const markdownItAbbr = require('markdown-it-abbr')
const markdownItHighlightjs = require('markdown-it-highlightjs')
const path = require('path')
const fs = require('fs')

function makeMd (config) {
  const log = makeLog(config)
  const mdOpts = {
    html: true,
    linkify: true,
    typographer: true
  }
  return md
  function md (item, cb) {
    if (!item) throw new Error('md: missing item object')
    if (!config) throw new Error('md: missing config object')
    if (!item.path) throw new Error('md: missing path to md file')

    console.log(item.path)
    const resolvedPath = path.resolve(path.dirname(config.file), item.path)
    console.log(resolvedPath)

    fs.readFile(resolvedPath, 'utf8', (err, body) => {
      if (err) return cb(err)

      // let frontMatter
      let mdUnparsed
      if (body.trim().startsWith('---')) {
        const [/* _ */, /* frontMatterUnparsed */, ...mdParts] = body.split('---')
        mdUnparsed = mdParts.join('---')
        // frontMatter = yaml.load(frontMatterUnparsed)
      } else {
        // frontMatter = {}
        mdUnparsed = body
      }

      const mdIt = markdownIt(mdOpts)
        .use(markdownItSub)
        .use(markdownItSup)
        .use(markdownItFootnote)
        .use(markdownItDeflist)
        .use(markdownItEmoji)
        .use(markdownItIns)
        .use(markdownItMark)
        .use(markdownItAbbr)
        .use(markdownItHighlightjs, { auto: false })

      const html = mdIt.render(mdUnparsed)

      item.content = html

      log(item, cb)
    })
  }
}

module.exports = makeMd
