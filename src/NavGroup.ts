import ChainedMap from './ChainedMap'
import Chainable from './Chainable'
import NavItem, { NavItemToConfig } from './NavItem'
import Nav from './Nav'

export interface NavGroupToConfig {
  text?: string
  ariaLabel?: string
  items?: NavItemToConfig[]
}
interface NavGroup {
  text: (p: string) => this
  ariaLabel: (p: string) => this
}

class NavGroup extends ChainedMap<string, Nav> {
  name: string
  items = new ChainedMap<NavItem, this>(this)
  constructor(parent: Nav, name: string) {
    super(parent)
    this.name = name
    this.extend(['text', 'ariaLabel'])
  }
  item(name: string): NavItem {
    return this.items.getOrCompute(name, () => new NavItem(this, name))
  }
  toConfig(): NavGroupToConfig {
    const itemsConfig = this.items.values().map(item => item.toConfig())
    // return this.clean(
    //   Object.assign(this.entries() || {}, { items: itemsConfig })
    // )
    return this.clean({
      ...(this.entries() || {}),
      ...{ items: itemsConfig }
    })
  }
}

export default NavGroup
