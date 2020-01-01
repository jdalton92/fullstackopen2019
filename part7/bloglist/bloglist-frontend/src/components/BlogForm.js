import React, { useState } from 'react'
import { connect } from 'react-redux'
import { newNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = (props) => {
    const [newNoteVisible, setNewNoteVisible] = useState(false)

    const newBlogForm = () => {
        const hideWhenVisible = { display: newNoteVisible ? 'none' : '' }
        const showWhenVisible = { display: newNoteVisible ? '' : 'none' }

        return (
            <div>
                <div style={showWhenVisible}>
                    <form onSubmit={addBlog}>
                        <div>
                            title:
                  <input name='title' />
                        </div>
                        <div>
                            author:
                  <input name='author' />
                        </div>
                        <div>
                            url:
                  <input name='url' />
                        </div>
                        <button type="submit">create</button>
                    </form>
                    <button onClick={() => setNewNoteVisible(false)}>cancel</button>
                </div>

                <div style={hideWhenVisible}>
                    <button onClick={() => setNewNoteVisible(true)}>new blog</button>
                </div>
            </div>
        )
    }

    const addBlog = async (event) => {
        event.preventDefault()
        try {
            const blogObject = {
                title: event.target.title.value,
                author: event.target.author.value,
                url: event.target.url.value,
            }
            props.createBlog(blogObject)
            props.newNotification(`A new blog added: ${blogObject.title} by ${blogObject.author}`)
            setNewNoteVisible(false)
            event.target.title.value = ''
            event.target.author.value = ''
            event.target.url.value = ''
        } catch (e) {
            props.newNotification(e)
        }
    }

    // if user logged in show 'new blog' button
    if (props.user) {
        return newBlogForm()
    }
    // if no user logged in then hide
    return null
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        user: state.user,
    }
}

const mapDispatchToProps = {
    createBlog,
    newNotification,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlogForm)