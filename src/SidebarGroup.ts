import ChainedMap from './ChainedMap'
import ChainedSet from './ChainedSet'
import Sidebar from './Sidebar'

export interface SidebarGroupToConfig {
  title?: string
  sidebarDepth?: number
  collapsable?: boolean
  path?: string
  children?: string[]
}

interface SidebarGroup<P = Sidebar> {
  title: (p: string) => this
  sidebarDepth: (p: number) => this
  collapsable: (p: boolean) => this
  path: (p: string) => this
}

class SidebarGroup<P = Sidebar> extends ChainedMap<
  string | number | boolean,
  P
> {
  name: string
  children = new ChainedSet<string, this>(this)
  constructor(parent: P, name: string) {
    super(parent)
    this.name = name

    this.extend(['title', 'sidebarDepth', 'collapsable', 'path'])
  }
  toConfig(): SidebarGroupToConfig {
    const config = this.clean({
      ...(this.entries() || {}),
      children: this.children.values()
    })
    return config
  }
}

export default SidebarGroup
