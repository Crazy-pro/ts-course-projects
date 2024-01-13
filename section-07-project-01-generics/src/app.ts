// const names: Array<string> = [] // string[]
// // names[0].split(' ')

// const promise: Promise<number> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(10)
//   }, 2000)
// })

// promise.then(data => {
//   // data.split(' ')
// })

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB)
}

const mergedObj = merge({ name: 'Max', hobbies: ['Sports'] }, { age: 30 })
console.log(mergedObj)

interface Lengthy {
  length: number
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let description = 'Got no value!'
  if (element.length === 1) {
    description = 'Got 1 element'
  } else if (element.length > 1) {
    description = 'Got ' + element.length + ' element'
  }
  return [element, description]
}

console.log(countAndDescribe(['Sports', 'Cooking']))

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return 'Value: ' + obj[key]
}

extractAndConvert({ name: 'Alex' }, 'name')

class DataStorage<T extends string | number | boolean | object> {
  private data: T[] = []

  addItem(item: T) {
    this.data.push(item)
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1)
  }

  getItems() {
    return [...this.data]
  }
}

const textStorage = new DataStorage<string>()
textStorage.addItem('Alex')
textStorage.addItem('Ann')
textStorage.removeItem('Max')
console.log(textStorage.getItems())

const numberStorage = new DataStorage<number>()

const objectStorage = new DataStorage<object>()
const alex = { name: 'Alex' }

objectStorage.addItem(alex)
objectStorage.addItem({ name: 'Ann' })

objectStorage.removeItem(alex)

console.log(objectStorage.getItems())

interface CourseGoal {
  title: string
  description: string
  completeUntil: Date
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {}
  courseGoal.title = title
  courseGoal.description = description
  courseGoal.completeUntil = date
  removeEventListener
  return courseGoal as CourseGoal
}

const names: Readonly<string[]> = ['Max', 'Alex']
// names.push('Ann')
// names.pop()
