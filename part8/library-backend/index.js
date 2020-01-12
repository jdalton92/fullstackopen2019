const { ApolloServer, AuthenticationError, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')

const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const jwt = require('jsonwebtoken')
require('dotenv').config()

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const JWT_SECRET = process.env.JWT_SECRET

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const typeDefs = gql`
type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
type Token {
    value: String!
}

type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
}

type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
}

type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author!]!
    me: User
  }

type Mutation {
    addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
    ) : Book
    editAuthor(
        name: String!
        setBornTo: Int!
    ) : Author
    createUser(
        username: String!
        favoriteGenre: String!
    ): User
    login(
        username: String!
        password: String!
    ): Token
}

type Subscription {
    bookAdded: Book!
}
`
const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, { author, genre }) => {
            if (author && genre) {
                const authorId = await Author.findOne({ name: author }).select('_id')
                return Book
                    .find({
                        genres: genre,
                        author: authorId._id
                    })
                    .populate('author')
            }
            if (author) {
                const authorId = await Author
                    .findOne({ name: author })
                    .select('_id')
                return Book
                    .find({ author: authorId._id })
                    .populate('author')
            }
            if (genre) {
                return Book
                    .find({ genres: genre })
                    .populate('author')
            }
            return Book.find({}).populate('author')
        },
        allAuthors: (root, args) => {
            return Author.find({}).populate('books')
        },
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Author: {
        bookCount: async ({ _id }) => Book.find({ author: _id }).countDocuments()
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new AuthenticationError('user not logged in')
            }

            try {
                //Create new author if doesn't exist
                let authorId = await Author.findOne({ name: args.author }).select('_id')
                if (!authorId) {
                    const newAuthor = new Author({
                        name: args.author
                    })
                    await newAuthor.save()
                    authorId = newAuthor
                }

                //Create new book
                const book = new Book({
                    title: args.title,
                    published: args.published,
                    genres: args.genres,
                    author: authorId._id
                })
                await book.save()
            } catch (e) {
                throw new UserInputError(e.message, {
                    invalidArgs: args
                })
            }

            const newBook = await Book.findOne({ title: args.title }).populate('author')
            pubsub.publish('BOOK_ADDED', { bookAdded: newBook })

            return newBook
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new AuthenticationError('user not logged in')
            }

            const author = await Author.findOne({ name: args.name })
            author.born = args.setBornTo
            if (author) {
                try {
                    await author.save()
                } catch (e) {
                    throw new UserInputError(e.message, {
                        invalidArgs: args
                    })
                }
                return author
            }
            return null
        },
        createUser: async (root, { username, favoriteGenre }) => {
            try {
                const newUser = new User({
                    username,
                    favoriteGenre
                })
                await newUser.save()
            } catch (e) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
            return newUser
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secred') {
                throw new UserInputError("wrong credentials")
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        },
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})