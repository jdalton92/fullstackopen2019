let _ = require('lodash')

const totalLikes = (blogs) => {
    const reducer = (sum, item) => sum + item.likes
    return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
    const maxLikes = Math.max.apply(Math, blogs.map((blog) => blog.likes))
    const maxBlog = blogs.filter(blog => blog.likes === maxLikes)
    return maxBlog[0]
}

const authorWithMostBlogs = (blogs) => {
    const result = _(blogs)
        .groupBy('author')
        .map((items, author) => ({ "author": author, "blogs": items.length }))
        .value();
    const max = _.maxBy(result, "blogs")
    return max
}

const mostLikes = (blogs) => {
    const cumulativeLikes = _(blogs)
        .groupBy("author")
        .map((blog, author) => ({
            author: author,
            likes: _.sumBy(blog, "likes"),
        }))
        .value()
    const mostLikes = _.maxBy(cumulativeLikes, "likes")
    return mostLikes
}

module.exports = {
    totalLikes,
    favouriteBlog,
    authorWithMostBlogs,
    mostLikes
}

