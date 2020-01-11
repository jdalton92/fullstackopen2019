const mongoose = require('mongoose')
require('dotenv').config()

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

mongoose.set('useFindAndModify', false)

const JWT_SECRET = process.env.JWT_SECRET

const MONGODB_URI = process.env.MONGODB_URI

console.log('commecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

let dbInitAuthors = [
    {
        name: 'Robert Martin',
        born: 1952
    },
    {
        name: 'Martin Fowler',
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        born: 1821
    },
    {
        name: 'Joshua Kerievsky'
    },
    {
        name: 'Sandi Metz'
    },
]

let dbInitBooks = [
    {
        title: 'Clean Code',
        published: 2008,
        author: '5e16ed3bbacd6f0a3455381d',
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: '5e16ed3bbacd6f0a3455381d',
        genres: ['agile', 'patterns', 'design']
    }
]

let dbInitUsers = [
    {
        username: 'Test User',
        favoriteGenre: 'agile'
    }
]

// dbInitAuthors.map(a => {
//     const author = new Author({ ...a })
//     author.save()
// })

// dbInitBooks.map(b => {
//     const book = new Book({ ...b })
//     book.save()
// })

dbInitUsers.map(u => {
    const user = new User({ ...u })
    user.save()
})