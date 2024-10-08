#!/usr/bin/env node
/* eslint no-undef: 0 */

/**
 * This code is a Node.js script that uses the `autocorrect-node` package to
 * automatically fix the formatting of various filetypes (e.g. fixing indentation,
 * line endings, etc.) for a given file or files.
 * The script accepts an optional `--verbose` flag, which enables verbose logging.
 * it also accepts a single argument (required), which is the filepath of
 * the file or files to process. The pattern can be a glob pattern (e.g. `*.md`).
 * The script will print a summary of the results to stdout.
 * Example usage:
 *   node autocorrect-node.js --verbose *.md
 */

import * as fs from 'fs'
import * as glob from 'glob'
import * as autocorrect from 'autocorrect-node'

(function main() {
  let config = { verbose: false, filepath: null }

  let args = process.argv.slice(2)
  if (args.includes('--verbose')) {
    config.verbose = true
    args = args.filter(arg => arg !== '--verbose')
  }
  if (args.length === 1) config.filepath = args[0]
  else if (args.length > 1) return console.error('Too many arguments!')
  else return console.error('No filepath specified!')

  const files = glob.globSync(config.filepath)
  const logPrefix = '[AutoCorrect]'

  let changedCount = 0
  files.forEach(file => {
    if (config.verbose) console.log(`${logPrefix} Processing file: ${file}`)
    const fileContent = fs.readFileSync(file, 'utf8')
    const corrected = autocorrect.formatFor(fileContent, file.split('.').pop())
    if (corrected !== fileContent) changedCount += 1
    fs.writeFileSync(file, corrected, 'utf8')
  })

  console.log(`${logPrefix} Processed ${files.length} files, ${changedCount} changed.`)
}())
