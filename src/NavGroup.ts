const ChainedMap = require('./ChainedMap')
const NavItem = require('./NavItem')
class NavGroup extends ChainedMap {
  constructor(parent, name) {
    super(parent)
    this.name = name
    this.extend(['text'])
    this.items = new ChainedMap(this)
  }
  item(name) {
    return this.items.getOrCompute(name, () => new NavItem(this, name))
  }
  toConfig() {
    const itemsConfig = this.items.values().map(item => item.toConfig())
    return this.clean(
      Object.assign(this.entries() || {}, { items: itemsConfig })
    )
  }
}

module.exports = NavGroup
