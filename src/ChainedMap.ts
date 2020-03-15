import Chainable from './Chainable'

type Entries<Value> = {
  [key: string]: Value
}

class ChainedMap<Value, Parent> extends Chainable<Parent> {
  [key: string]: any
  shorthands: string[] = []
  private store = new Map<string | undefined, Value>()
  constructor(parent: Parent) {
    super(parent)
  }
  has(key: string | undefined): boolean {
    return this.store.has(key)
  }
  set(key: string | undefined, value: Value): this {
    this.store.set(key, value)
    return this
  }
  get(key: string | undefined): Value | undefined {
    return this.store.get(key)
  }
  private order(): { entries: Entries<Value>; order: string[] } {
    const entries = [...this.store].reduce(
      (acc, [key, value]) => {
        acc[String(key)] = value
        return acc
      },
      {} as Entries<Value>
    )
    const order = Object.keys(entries)
    return { entries, order }
  }
  entries(): Entries<Value> | undefined {
    const { entries, order } = this.order()
    if (order.length) {
      return entries
    }
    return
  }
  values(): Value[] {
    const { entries, order } = this.order()
    return order.map(key => entries[key])
  }

  getOrCompute(key: string | undefined, fn: () => Value): Value {
    if (!this.has(key)) {
      this.set(key, fn())
    }
    return this.get(key) as Value
  }
  extend(methods: string[]): this {
    this.shorthands = methods
    methods.forEach(method => {
      this[method] = (value: Value): this => this.set(method, value)
    })
    return this
  }

  clean<K extends Record<string, any>>(obj: K): Partial<K> {
    return Object.keys(obj).reduce(
      (acc, key) => {
        const value = obj[key]

        if (value == null) {
          return acc
        }

        if (Array.isArray(value) && !value.length) {
          return acc
        }

        if (
          Object.prototype.toString.call(value) === '[object Object]' &&
          !Object.keys(value).length
        ) {
          return acc
        }

        acc[key] = value

        return acc
      },
      {} as any
    )
  }
}

export default ChainedMap
