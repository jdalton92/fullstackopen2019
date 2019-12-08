const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('all blogs are returned', async () => {
    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb.length).toBe(helper.initialBlogs.length)
})

test('unique identified is id', async () => {
    const blogsAtEnd = await helper.blogsInDb()
    const contents = blogsAtEnd.map(b => b.id)
    expect(contents).toBeDefined()
})

test('posting a test will increase blogs length by one', async () => {
    const newBlog = {
        "title": "Test Title",
        "author": "Test Author",
        "url": "www.test-webpage.com",
        "likes": 5
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(b => b.title)
    expect(contents).toContain('Test Title')
})

test('if likes is missing it defaults to 0', async () => {
    const newBlog = {
        "title": "Test Title",
        "author": "Test Author",
        "url": "www.test-webpage.com",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.filter(b => b.title === newBlog.title)
    expect(contents[0].likes).toEqual(0)
})

test('posting a test with no url will get a HTTP 400 response', async () => {
    const newBlog = {
        "title": "Test Title with no url",
        "author": "Test Author",
        // "url": "www.test-webpage.com",
        "likes": 5
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
})

test('posting a test with no title will get a HTTP 400 response', async () => {
    const newBlog = {
        // "title": "Test Title with no url",
        "author": "Test Author",
        "url": "www.test-webpage.com",
        "likes": 5
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
})

afterAll(() => {
    mongoose.connection.close()
})