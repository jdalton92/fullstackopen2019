import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { newNotification } from '../reducers/notificationReducer'

const Blogs = (props) => {
    if (props.user) {
        return (
            <div>
                {props.blogs
                    .sort((a, b) => b.likes - a.likes)
                    .map(blog =>
                        <Blog
                            key={blog.id}
                            blog={blog}
                            likeBlog={
                                event => {
                                    event.preventDefault()
                                    props.likeBlog(blog)
                                    props.newNotification(`${blog.title} liked`)
                                }
                            }
                            deleteBlog={
                                event => {
                                    event.preventDefault()
                                    if (window.confirm(`Remove post ${blog.title} by ${blog.author}?`)) {
                                        props.deleteBlog(blog)
                                        props.newNotification(`${blog.title} removed`)
                                    }
                                }
                            }
                            user={props.user}
                        />
                    )}
            </div>
        )
    }
    return null
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        user: state.user,
    }
}

const mapDispatchToProps = {
    deleteBlog,
    likeBlog,
    newNotification,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Blogs)