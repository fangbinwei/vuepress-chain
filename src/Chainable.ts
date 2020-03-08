type Parent = Chainable | undefined

class Chainable {
  parent: Chainable
  constructor(parent: Chainable) {
    this.parent = parent
  }
  end(): Chainable {
    return this.parent
  }
}

export default Chainable
