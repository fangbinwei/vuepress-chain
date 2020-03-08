import Chainable from './Chainable'

type Entries<T> = {
  [key: string]: T
}

class ChainedMap<T> extends Chainable {
  [key: string]: any
  shorthands: string[] = []
  private store = new Map<string, T>()
  constructor(parent: Chainable) {
    super(parent)
  }
  private has(key: string): boolean {
    return this.store.has(key)
  }
  private set(key: string, value: T): this {
    this.store.set(key, value)
    return this
  }
  private get(key: string): T | undefined {
    return this.store.get(key)
  }
  private order(): { entries: Entries<T>; order: string[] } {
    const entries = [...this.store].reduce(
      (acc, [key, value]) => {
        acc[key] = value
        return acc
      },
      {} as Entries<T>
    )
    const order = Object.keys(entries)
    return { entries, order }
  }
  entries(): Entries<T> | undefined {
    const { entries, order } = this.order()
    if (order.length) {
      return entries
    }
    return
  }
  values(): T[] {
    const { entries, order } = this.order()
    return order.map(key => entries[key])
  }

  getOrCompute(key: string, fn: () => T): T {
    if (!this.has(key)) {
      this.set(key, fn())
    }
    return this.get(key) as T
  }
  extend(methods: string[]): this {
    this.shorthands = methods
    methods.forEach(method => {
      this[method] = (value: T): this => this.set(method, value)
    })
    return this
  }

  clean(obj: Entries<T>): Entries<T> {
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
      {} as Entries<T>
    )
  }
}

export default ChainedMap
