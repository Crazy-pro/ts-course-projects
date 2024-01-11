type Admin = {
  name: string
  privileges: string[]
}

type Employee = {
  name: string
  startDate: Date
}

// interface ElevatedEmployee extends Employee, Admin {}

type ElevatedEmployee = Admin & Employee

const e1: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date()
}

type Combinable = string | number

type Numeric = number | boolean

type Universal = Combinable & Numeric

function add(a: number, b: number): number
function add(a: string, b: string): string
function add(a: string, b: number): string
function add(a: number, b: string): string
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString()
  }
  return a + b
}

const result = add('Alex', ' Klimchuk')
result.split(' ')


const fetchedUserData = {
  id: 'u1',
  name: 'Alex',
  job: {
    title: 'CEO',
    description: 'My own company'
  }
}

console.log(fetchedUserData?.job?.title)

// const userInput = '' // or null or undefined
// const storedData = userInput || 'DEFAULT'

const userInput = undefined // null or undefined
const storedData = userInput ?? 'DEFAULT'

console.log(storedData)

type UnknownEmployee = Employee | Admin

const printEmployeeInfo = (employee: UnknownEmployee) => {
  console.log(`Name: ${employee.name}`)
  if ('privileges' in employee) {
    console.log(`Privileges: ${employee.privileges}`)
  }
  if ('startDate' in employee) {
    console.log(`Start Date: ${employee.startDate}`)
  }
}

printEmployeeInfo({
  name: 'Alex',
  startDate: new Date()
})

class Car {
  drive() {
    console.log('Driving a car...')
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...')
  }

  loadCargo(amount: number) {
    console.log(`Loading cargo... ${amount}`)
  }
}

type Vehicle = Car | Truck

const v1 = new Car()

const v2 = new Truck()

const useVehicle = (vehicle: Vehicle) => {
  vehicle.drive()
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(777)
  }
}

useVehicle(v1)
useVehicle(v2)

interface Bird {
  type: 'bird'
  flyingSpeed: number
}

interface Horse {
  type: 'horse'
  runningSpeed: number
}

type Animal = Bird | Horse

const moveAnimal = (animal: Animal) => {
  let speed
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed
      break
    case 'horse':
      speed = animal.runningSpeed
      break
  }
  console.log(`Moving at speed: ${speed}`)
}

moveAnimal({
  type: 'bird',
  flyingSpeed: 49
})

// const userInputElement = <HTMLInputElement>document.getElementById('user-input')!

// const userInputElement = document.getElementById('user-input')! as HTMLInputElement

const userInputElement = document.getElementById('user-input')

if (userInputElement) {
  (userInputElement as HTMLInputElement).value = 'Hi there'
}

interface ErrorContainer { // { email: 'Not a valid Email!', userName: 'Must start with a capital character!' }
  // id: string // Cannot be number!
  [prop: string]: string
}

const errorBag: ErrorContainer = {
  email: 'Not a valid Email!',
  userName: 'Must start with a capital character!'
}
