class Chainable<P = any> {
  parent: P
  constructor(parent: P) {
    this.parent = parent
  }
  end(): P {
    return this.parent
  }
}

export default Chainable
