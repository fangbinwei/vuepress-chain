const ChainedMap = require('./ChainedMap')
const ChainedSet = require('./ChainedSet')
const SidebarGroup = require('./SidebarGroup')

class Sidebar extends ChainedMap {
  constructor(parent, link) {
    super(parent)
    this.link = link
    this.sidebarGroups = new ChainedMap(this)
    this.sub = new ChainedSet(this)
  }
  group(name) {
    return this.sidebarGroups.getOrCompute(
      name,
      () => new SidebarGroup(this, name)
    )
  }
  toConfig() {
    const config = this.sub.size
      ? this.sub.values()
      : this.sidebarGroups.values().map(sidebarGroup => sidebarGroup.toConfig())
    return config
  }
}

module.exports = Sidebar
