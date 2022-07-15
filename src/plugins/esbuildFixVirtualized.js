import fs from "fs"

module.exports = () => ({
  name: "esbuild-fix-virtualized-plugin",
  setup(build) {
    build.onLoad(
      { filter: /react-virtualized\/dist\/es\/WindowScroller\/utils\/onScroll.js$/ },
      async args => {
        let contents = await fs.promises.readFile(args.path, "utf8")
        return { contents: contents.replace('import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";', "") }
      }
    )
  }
})