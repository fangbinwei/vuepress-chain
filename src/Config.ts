import ChainedMap from './ChainedMap'
import Sidebar, { SidebarToConfig } from './Sidebar'
import Nav, { NavToConfig } from './Nav'
import { stringify } from 'javascript-stringify'

interface ConfigToConfig {
  nav?: NavToConfig[]
  sidebar?: SidebarToConfig | Record<string, SidebarToConfig>
}

class Config extends ChainedMap<any, void> {
  private sidebars = new ChainedMap<Sidebar, this>(this)
  private navs = new ChainedMap<Nav, this>(this)
  constructor() {
    super()
  }
  sidebar(link?: string): Sidebar {
    return this.sidebars.getOrCompute(link, () => new Sidebar(this, link))
  }
  nav(name: string): Nav {
    return this.navs.getOrCompute(name, () => new Nav(this, name))
  }
  toConfig(): ConfigToConfig {
    const sidebars = this.sidebars.entries() || {}
    const sidebarDefault = this.sidebars.get(undefined)
    const sidebarsConfig = sidebarDefault
      ? sidebarDefault.toConfig()
      : Object.keys(sidebars).reduce(
          (acc, key) => {
            acc[key] = sidebars[key].toConfig()
            return acc
          },
          {} as Record<string, SidebarToConfig>
        )
    const navsConfig = this.navs.values().map(nav => nav.toConfig())

    const config = this.clean({
      ...(this.entries() || {}),
      ...{
        sidebar: sidebarsConfig,
        nav: navsConfig
      }
    })
    return config
  }
  toString(): string | undefined {
    return stringify(this.toConfig(), null, ' ')
  }
}

export = Config
