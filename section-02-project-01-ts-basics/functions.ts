function sum(n1: number, n2: number): number {
    return n1 + n2
}

function showResult(num: number): void /* :undefined */ {
    console.log('Result: ' + num)
    // return
}

showResult(sum(5, 34))

// let combineValues: Function
let combineValues: (a: number, b: number) => number

combineValues = sum
// combineValues = showResult
// combineValues = 5

console.log(combineValues(8, 56))

// let someValue: undefined

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
    const result = n1 + n2
    cb(result)
}

addAndHandle(10, 20, (result) => {
    console.log(result)
})
