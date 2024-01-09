let userInput: unknown //: string | number
let userName: string

userInput = 5
userInput = 'Alex'

if (typeof userInput === 'string') {
    userName = userInput
}

function generaError(message: string, errorCode: number): never {
    throw { message, errorCode }
    // Other logic
}

var result = generaError('Not Found error', 404)

console.log(result)
