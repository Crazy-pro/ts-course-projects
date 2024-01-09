// const person: {
//     name: string
//     age: number
//     hobbies: string[]
//     role: [number, string]
// } = {
//     name: 'Alex',
//     age: 25,
//     hobbies: ['GYM', 'Kick Boxing'],
//     role: [2, 'author']
// }

// console.log(person.nickname)

// person.role.push('admin')
// person.role[1] = 10
// person.role = [0, 'admin', 'author']

enum Role {
    ADMIN = 'admin',
    AUTHOR = 'author',
    READ_ONLY = 'read only'
}

const person = {
    name: 'Alex',
    age: 25,
    hobbies: ['GYM', 'Kick Boxing'],
    role: Role.ADMIN
}

let favoriteActivities: string[]
favoriteActivities = ['GYM']

console.log(person.name)

for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase())
    // console.log(hobby.map()) // Error!!!
}

if (person.role !== Role.ADMIN) {
    console.log('User doesn\'t have admin permissions!')
}
