import Chainable from './Chainable'
class ChainedSet<Value, Parent> extends Chainable<Parent> {
  private store = new Set<Value>()
  constructor(parent: Parent) {
    super(parent)
  }
  add(value: Value): this {
    this.store.add(value)
    return this
  }
  delete(value: Value): this {
    this.store.delete(value)
    return this
  }
  get size(): number {
    return this.store.size
  }
  values(): Value[] {
    return [...this.store]
  }
  has(value: Value): boolean {
    return this.store.has(value)
  }
  clear(): this {
    this.store.clear()
    return this
  }
}
export default ChainedSet
