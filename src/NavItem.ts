const ChainedMap = require('./ChainedMap')
class NavItem extends ChainedMap {
  constructor(parent, name) {
    super(parent)
    this.name = name
    this.extend(['text', 'link'])
  }
  toConfig() {
    return this.clean(this.entries() || {})
  }
}

module.exports = NavItem
