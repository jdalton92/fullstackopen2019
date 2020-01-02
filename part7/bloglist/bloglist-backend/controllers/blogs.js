const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', {
            username: 1,
            name: 1,
        })

    response.json(blogs.map(b => b.toJSON()))

})

blogsRouter.get('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)
        if (blog) {
            response.json(blog.toJSON())
        } else {
            response.status(404).end()
        }
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    const token = helper.tokenExtractor(request)

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response
                .status(401)
                .json({
                    error: 'token missing or invalid'
                })
        }

        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            user: user._id
        })

        if (!blog.title || !blog.url) {
            response
                .status(400)
                .end()
        }

        if (!blog.likes) {
            blog.likes = 0
        }

        if (blog.title && blog.url) {
            const savedBlog = await blog.save()
            user.blogs = user.blogs.concat(savedBlog._id)
            await user.save()
            response.json(savedBlog.toJSON())
        }

    } catch (exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    const token = helper.tokenExtractor(request)

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response
                .status(401)
                .json({
                    error: 'token missing or invalid'
                })
        }

        const blog = await Blog.findById(request.params.id)

        if (blog.user.toString() === decodedToken.id) {
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
        } else {
            response.status(404).end()
        }

    } catch (exception) {
        next(exception)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    const token = helper.tokenExtractor(request)

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response
                .status(401)
                .json({
                    error: 'token missing or invalid'
                })
        }

        const blog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            comments: body.comments
        }

        const newBlog = await Blog.findById(request.params.id)
        await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.json(newBlog.toJSON())
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter