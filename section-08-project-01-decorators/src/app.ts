function Logger(logString: string) {
  console.log('LOGGER FACTORY')
  return function (constructor: Function) {
    console.log(logString)
    console.log(constructor)
  }
}

function WithTemplate(template: string, hookId: string) {
  console.log('TEMPLATE FACTORY')
  return function <T extends { new(...args: any[]): { name: string } }>(originalConstrustor: T) {
    return class extends originalConstrustor {
      constructor(..._: any[]) {
        super()
        console.log('Rendering template')
        const hookEl = document.getElementById(hookId)
        if (hookEl) {
          hookEl.innerHTML = template
          hookEl.querySelector('h1')!.textContent = this.name
        }
      }
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

// const pers = new Person()

// console.log(pers)

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

function Autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this)
      return boundFn
    }
  }
  return adjDescriptor
}

class Printer {
  message = 'Just a message!'

  @Autobind
  showMessage() {
    console.log(this.message)
  }
}

const p = new Printer()
p.showMessage()

const button = document.querySelector('button')!
button.addEventListener('click', p.showMessage)

// ----

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]
  }
}

const registeredValidators: ValidatorConfig = {}

function Required(target: any, propertyName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propertyName]: [
      ...(registeredValidators[target.constructor.name]?.[propertyName] ?? []),
      'required'
    ]
  }
}

function PositiveNumber(target: any, propertyName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propertyName]: [
      ...(registeredValidators[target.constructor.name]?.[propertyName] ?? []),
      'positive'
    ]
  }
}

function validate(object: any) {
  const objectValidatorConfig = registeredValidators[object.constructor.name]
  if (!objectValidatorConfig) {
    return true
  }
  let isValid = true
  for (const prop in objectValidatorConfig) {
    for (const validator of objectValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!object[prop]
          break
        case 'positive':
          isValid = isValid && object[prop] > 0
          break
      }
    }
  }
  return isValid
}


class Course {
  @Required
  title: string
  @PositiveNumber
  price: number

  constructor(title: string, price: number) {
    this.title = title
    this.price = price
  }
}

const courseForm = document.querySelector('form')!
courseForm.addEventListener('submit', event => {
  event.preventDefault()
  const titleEl = document.getElementById('title') as HTMLInputElement
  const priceEl = document.getElementById('price') as HTMLInputElement

  const title = titleEl.value
  const price = +priceEl.value

  const createdCourse = new Course(title, price)

  if (!validate(createdCourse)) {
    alert('Invalid input, please try again!')
    return
  }
  console.log(createdCourse)
})
