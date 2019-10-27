const ChainedMap = require('./ChainedMap')
const NavGroup = require('./NavGroup')
class Nav extends ChainedMap {
  constructor(parent, name) {
    super(parent)
    this.name = name
    this.extend(['text', 'link'])
    this.navGroups = new ChainedMap(this)
  }
  group(name) {
    return this.navGroups.getOrCompute(name, () => new NavGroup(this, name))
  }
  toConfig() {
    const itemsConfig = this.navGroups
      .values()
      .map(navGroup => navGroup.toConfig())
    const config = this.clean(
      Object.assign(this.entries() || {}, {
        items: itemsConfig
      })
    )
    return config
  }
}

module.exports = Nav
