const mongoose = require('mongoose')
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)

if (process.argv.length !== 5 && process.argv.length !== 3) {
    console.log('enter syntax: node mongo.js password name number')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
    `mongodb+srv://fullstack:${password}@phonebook-vnyb9.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: name,
    number: number,
})

if (process.argv.length === 3) {
    console.log('phonebook:')
    Person
        .find({})
        .then(persons => {
            persons.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
        })
    setTimeout(() => mongoose.connection.close(), 4000)
    setTimeout(() => process.exit(1), 4000)
}

if (process.argv.length === 5) {
    person.save().then(response => {
        console.log(`addded ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}