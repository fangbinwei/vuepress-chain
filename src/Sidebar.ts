import ChainedMap from './ChainedMap'
import ChainedSet from './ChainedSet'
import SidebarGroup, { SidebarGroupToConfig } from './SidebarGroup'
import Config from './Config'

export type SidebarToConfig =
  | Array<string | string[]>
  | Array<SidebarGroupToConfig>

class Sidebar extends ChainedMap<any, Config> {
  link: string | undefined
  private sidebarGroups = new ChainedMap<SidebarGroup, this>(this)
  sub = new ChainedSet<string | string[], this>(this)
  constructor(parent: Config, link?: string) {
    super(parent)
    this.link = link
  }
  group(name: string): SidebarGroup {
    return this.sidebarGroups.getOrCompute(
      name,
      () => new SidebarGroup(this, name)
    )
  }
  toConfig(): SidebarToConfig {
    const config = this.sub.size
      ? this.sub.values()
      : this.sidebarGroups.values().map(sidebarGroup => sidebarGroup.toConfig())
    return config
  }
}

export default Sidebar
