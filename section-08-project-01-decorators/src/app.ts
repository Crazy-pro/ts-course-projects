function Logger(logString: string) {
  console.log('LOGGER FACTORY')
  return function (constructor: Function) {
    console.log(logString)
    console.log(constructor)
  }
}

function WithTemplate(template: string, hookId: string) {
  console.log('TEMPLATE FACTORY')
  return function (constructor: any) {
    console.log('Rendering template')
    const hookEl = document.getElementById(hookId)
    const p = new constructor()
    if (hookEl) {
      hookEl.innerHTML = template
      hookEl.querySelector('h1')!.textContent = p.name
    }
  }
}

// @Logger('LOGGING - PERSON')
@Logger('LOGGING')
@WithTemplate('<h1>My Person Object</h2>', 'app')
class Person {
  name = 'Alex'

  constructor() {
    console.log('Creating person object...')
  }
}

const pers = new Person()

console.log(pers)

// ---

function Log(target: any, propertyName: string | Symbol) {
  console.log('Property decorator!')
  console.log(target, propertyName)
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator!')
  console.log(target, name, descriptor)
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('Method decorator!')
  console.log(target, name, descriptor)
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log('Parameter decorator!')
  console.log(target, name, position)
}

class Product {
  @Log
  title: string
  private _price: number

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val
    } else {
      throw Error('Invalid price - should be positive!')
    }
  }

  constructor(title: string, price: number) {
    this.title = title
    this._price = price
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax)
  }
}

const p1 = new Product('Book', 188)
const p2 = new Product('Book 2', 34)
