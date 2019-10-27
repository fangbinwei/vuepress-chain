const ChainedMap = require('./ChainedMap')
const Sidebar = require('./Sidebar')
const { stringify } = require('javascript-stringify')

class Config extends ChainedMap {
  constructor() {
    super()
    this.sidebars = new ChainedMap(this)
  }
  sidebar(link) {
    return this.sidebars.getOrCompute(link, () => new Sidebar(this, link))
  }
  toConfig() {
    const sidebars = this.sidebars.entries()
    const sidebarDefault = this.sidebars.get(undefined)
    const sidebarsToConfig = sidebarDefault
      ? sidebarDefault.toConfig()
      : Object.keys(sidebars).reduce((acc, key) => {
          acc[key] = sidebars[key].toConfig()
          return acc
        }, {})

    const config = this.clean(
      Object.assign(this.entries() || {}, {
        sidebar: sidebarsToConfig
      })
    )
    return config
  }
  toString() {
    return stringify(this.toConfig(), null, ' ')
  }
}

module.exports = Config
