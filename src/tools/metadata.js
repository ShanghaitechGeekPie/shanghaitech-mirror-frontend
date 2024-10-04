#!/usr/bin/env node
/* eslint no-undef: 0 */

import * as fs from 'fs'
import * as glob from 'glob'

import MarkdownIt from 'markdown-it'
import MarkdownItMeta from 'markdown-it-meta'

const getConfigFromArgs = () => {
  const config = {
    verbose: false,
    inputPath: '',
    outputFile: ''
  }
  const args = process.argv.slice(2)

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '-i':
        config.inputPath = args[++i]
        break
      case '-o':
        config.outputFile = args[++i]
        break
      case '--verbose':
        config.verbose = true
        break
      default:
        console.error('Unknown argument:', args[i])
        process.exit(1)
    }
  }

  if (!config.inputPath || !config.inputPath) {
    console.error('No input glob path or output file specified!')
    process.exit(1)
  }

  return config
}

(function main() {
  const config = getConfigFromArgs()
  const files = glob.globSync(config.inputPath)

  const parser = new MarkdownIt()
  parser.use(MarkdownItMeta)

  const logPrefix = '[Metadata]'
  const blogMetadata = files.map(file => {
    if (config.verbose) console.log(`${logPrefix} Processing file: ${file}`)
    parser.render(fs.readFileSync(file, 'utf8'))
    parser.meta.id = file.split('/').pop().replace('.md', '')
    return parser.meta
  })
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  fs.writeFileSync(config.outputFile, JSON.stringify(blogMetadata, null, 4))
  console.log(`${logPrefix} Processed ${files.length} files.`)
}())
