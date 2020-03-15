import ChainedMap from './ChainedMap'
import Config from './Config'
import NavGroup, { NavGroupToConfig } from './NavGroup'
import Chainable from './Chainable'

interface Nav {
  text: (p: string) => this
  link: (p: string) => this
  target: (p: string) => this
  rel: (p: string) => this
  ariaLabel: (p: string) => this
}
export interface NavToConfig {
  text?: string
  link?: string
  target?: string
  rel?: string
  ariaLabel?: string
  items?: NavGroupToConfig[]
}
// const extendMethods = ['text', 'link', 'target', 'rel', 'ariaLabel'] as const
// type ExtendMethods = typeof extendMethods[number]
// type NavToConfig = Partial<Record<ExtendMethods, string>> & {
//   item?: NavGroupToConfig
// }

class Nav extends ChainedMap<string, Config> {
  name: string
  navSubGroups = new ChainedMap<NavGroup, this>(this)
  constructor(parent: Config, name: string) {
    super(parent)
    this.name = name
    this.extend(['text', 'link', 'target', 'rel', 'ariaLabel'])
  }
  group(name: string): NavGroup {
    return this.navSubGroups.getOrCompute(name, () => new NavGroup(this, name))
  }
  toConfig(): NavToConfig {
    const navSubGroupsConfig = this.navSubGroups
      .values()
      .map(navSubGroup => navSubGroup.toConfig())
    // const config = this.clean(
    //   Object.assign(this.entries() || {}, {
    //     items: navSubGroupsConfig
    //   })
    // )
    const config = this.clean({
      ...(this.entries() || {}),
      ...{
        items: navSubGroupsConfig
      }
    })
    return config
  }
}

export default Nav

// const x: { a?: number } = Object.assign({ a: 'aaa' }, { b: 3 })
// const y: { a?: number } = Object.assign({ a: 'aaa' }, { b: 3 })

// class A<T, K extends keyof T> {
//   [key: string]: T[K]
//   constructor(data: T) {
//     Object.assign(this, data)
//   }
// }
