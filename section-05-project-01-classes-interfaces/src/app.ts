// type AddFunction = (a: number, b: number) => number

interface AddFunction {
  (a: number, b: number): number
}

let add: AddFunction

add = (n1: number, n2: number) => {
  return n1 + n2
}

interface BaseInterface {
  readonly name?: string
  outputName?: string
}

interface Greetable extends BaseInterface {
  greet(phrase: string): void
}

class Person implements Greetable {
  name?: string
  age = 30

  constructor(name?: string) {
    if (name) {
      this.name = name
    }
  }

  greet(phrase: string) {
    if (this.name) {
      console.log(`${phrase}: ${this.name}`)
    } else {
      console.log('Hi!')
    }
  }
}

let user1: Greetable

user1 = new Person()
// user1.name = 'Alex'

user1.greet('Hi there - I am')
console.log(user1)
