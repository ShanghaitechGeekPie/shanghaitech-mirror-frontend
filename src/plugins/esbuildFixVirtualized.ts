/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs'

export default () => ({
  name: 'esbuild-fix-virtualized-plugin',
  setup(build: any) {
    build.onLoad(
      { filter: /react-virtualized\/dist\/es\/WindowScroller\/utils\/onScroll.js$/ },
      async (args: any) => {
        const contents = await fs.promises.readFile(args.path, 'utf8')
        const toReplace = 'import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";'
        return { contents: contents.replace(toReplace, '') }
      }
    )
  }
})
