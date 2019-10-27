const ChainedMap = require('./ChainedMap')
const Sidebar = require('./Sidebar')
const Nav = require('./Nav')
const { stringify } = require('javascript-stringify')

class Config extends ChainedMap {
  constructor() {
    super()
    this.sidebars = new ChainedMap(this)
    this.navs = new ChainedMap(this)
  }
  sidebar(link) {
    return this.sidebars.getOrCompute(link, () => new Sidebar(this, link))
  }
  nav(name) {
    return this.navs.getOrCompute(name, () => new Nav(this, name))
  }
  toConfig() {
    const sidebars = this.sidebars.entries() || {}
    const sidebarDefault = this.sidebars.get(undefined)
    const sidebarsConfig = sidebarDefault
      ? sidebarDefault.toConfig()
      : Object.keys(sidebars).reduce((acc, key) => {
          acc[key] = sidebars[key].toConfig()
          return acc
        }, {})
    const navsConfig = this.navs.values().map(nav => nav.toConfig())

    const config = this.clean(
      Object.assign(this.entries() || {}, {
        sidebar: sidebarsConfig,
        nav: navsConfig
      })
    )
    return config
  }
  toString() {
    return stringify(this.toConfig(), null, ' ')
  }
}

module.exports = Config
