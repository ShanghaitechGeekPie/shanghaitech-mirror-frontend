import type { Plugin } from 'vite'
import * as path from 'path'
import * as fs from 'fs'

const fixReactVirtualized = {
  name: 'flat:react-virtualized',
  configResolved() {
    const file = require
      .resolve('react-virtualized')
      .replace(
        path.join('dist', 'commonjs', 'index.js'),
        path.join('dist', 'es', 'WindowScroller', 'utils', 'onScroll.js')
      )
    const toReplace = 'import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";'
    const modified = fs.readFileSync(file, 'utf-8').replace(toReplace, '')
    fs.writeFileSync(file, modified)
  }
} as Plugin

export default () => fixReactVirtualized
