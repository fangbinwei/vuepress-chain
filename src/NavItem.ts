import ChainedMap from './ChainedMap'
import Chainable from './Chainable'
import NavGroup from './NavGroup'

// type NavItemExtend = NavItem
// type NavItemT = Record<keyof NavItemExtend, string>
export interface NavItemToConfig {
  text?: string
  link?: string
}

interface NavItem {
  text: (p: string) => this
  link: (p: string) => this
  target: (p: string) => this
  rel: (p: string) => this
  ariaLabel: (p: string) => this
}

class NavItem<P = NavGroup> extends ChainedMap<string, P> {
  name: string
  constructor(parent: P, name: string) {
    super(parent)
    this.name = name
    this.extend(['text', 'link', 'target', 'rel', 'ariaLabel'])
  }
  toConfig(): NavItemToConfig {
    return this.clean(this.entries() || {})
  }
}

export default NavItem
