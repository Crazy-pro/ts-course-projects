abstract class Department {
  static fiscalYear = 2020
  // private readonly id: string
  // private name: string
  protected employees: string[] = []

  constructor(protected readonly id: string, public name: string) {
    // this.id = id
    // this.name = name
    // console.log(Department.fiscalYear)
  }

  static createEmployee(name: string) {
    return { name }
  }

  abstract describe(this: Department): void

  addEmployee(employee: string) {
    // Validation etc...
    // this.id = 'd2'
    this.employees.push(employee)
  }

  printEmployeeInformation() {
    console.log(this.employees.length)
    console.log(this.employees)
  }
}

class ITDepartment extends Department {
  admins: string[]

  constructor(id: string, admins: string[]) {
    super(id, 'IT')
    this.admins = admins
  }

  describe() {
    console.log('IT Department - ID: ' + this.id)
  }
}

class AccountingDepartment extends Department {
  private static instance: AccountingDepartment
  private lastReport: string

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport
    }
    throw new Error('No report found.')
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in a valid value!')
    }
    this.addReport(value)
  }

  private constructor(id: string, private reports: string[]) {
    super(id, 'Accounting')
    this.lastReport = reports[0]
  }

  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance
    }
    this.instance = new AccountingDepartment('d2', [])
    return this.instance
  }

  describe() {
    console.log(`Accounting Department - ID: ${this.id}`)
  }

  addEmployee(name: string) {
    if (name === 'Alex') {
      return
    }
    this.employees.push(name)
  }

  addReport(text: string) {
    this.reports.push(text)
    this.lastReport = text
  }

  printReports() {
    console.log(this.reports)
  }
}

const employee1 = Department.createEmployee('Alex')
console.log(employee1, Department.fiscalYear)

const it = new ITDepartment('d1', ['Alex'])

it.addEmployee('Alex')
it.addEmployee('Max')

// it.employees[2] = 'Ann'

it.describe()
it.name = 'NEW NAME'
it.printEmployeeInformation()

console.log(it)

// const accounting = new AccountingDepartment('d2', [])
const accounting = AccountingDepartment.getInstance()
const accounting2 = AccountingDepartment.getInstance()

console.log(accounting, accounting2)

accounting.mostRecentReport = 'Year End Report'
accounting.addReport('Something went wrong...')
console.log(accounting.mostRecentReport)

accounting.addEmployee('Alex')
accounting.addEmployee('Max')

// accounting.printReports()
// accounting.printEmployeeInformation()
accounting.describe()

// const accountingCopy = { name: 'DUMMY', describe: accounting.describe }

// accountingCopy.describe()
