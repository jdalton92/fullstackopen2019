import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOG':
            return action.data
        case 'ADD_BLOG':
            return state.concat(action.data)
        case 'LIKE_BLOG':
            return state.map(blog => (
                blog.id !== action.data.id ? blog : action.data
            ))
        case 'COMMENT_BLOG':
            return state.map(blog => (
                blog.id !== action.data.id ? blog : action.data
            ))
        case 'DELETE_BLOG':
            const deleteId = action.data.id
            return state.filter(blog => (
                blog.id !== deleteId
            ))
        default:
            return state
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOG',
            data: blogs
        })
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        await blogService.create(blog)
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOG',
            data: blogs
        })
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        const newBlog = { ...blog, likes: blog.likes + 1 }
        await blogService.addLike(newBlog)
        dispatch({
            type: 'LIKE_BLOG',
            data: newBlog
        })
    }
}

export const addComment = (blog, comment) => {
    return async dispatch => {
        const newBlog = { ...blog, comments: blog.comments.concat(comment) }
        await blogService.addComment(newBlog)
        dispatch({
            type: 'COMMENT_BLOG',
            data: newBlog
        })
    }
}

export const deleteBlog = (blog) => {
    return async dispatch => {
        await blogService.deleteBlog(blog)
        dispatch({
            type: 'DELETE_BLOG',
            data: blog
        })
    }
}

export default blogReducer