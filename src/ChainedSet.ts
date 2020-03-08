import Chainable from './Chainable'
class ChainedSet<T> extends Chainable {
  store = new Set<T>()
  constructor(parent: Chainable) {
    super(parent)
  }
  add(value: T): this {
    this.store.add(value)
    return this
  }
  delete(value: T): this {
    this.store.delete(value)
    return this
  }
  get size(): number {
    return this.store.size
  }
  values(): T[] {
    return [...this.store]
  }
  has(value: T): boolean {
    return this.store.has(value)
  }
  clear(): this {
    this.store.clear()
    return this
  }
}
export default ChainedSet
