import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'
import { newNotification } from '../../reducers/notificationReducer'
import { createBlog } from '../../reducers/blogReducer'

const BlogForm = (props) => {
    const [newNoteVisible, setNewNoteVisible] = useState(false)

    const newBlogForm = () => {
        const hideWhenVisible = { display: newNoteVisible ? 'none' : '' }
        const showWhenVisible = { display: newNoteVisible ? '' : 'none' }

        return (
            <div className='blog-form'>
                <div style={showWhenVisible}>
                    <Form onSubmit={addBlog}>
                        <Form.Field>
                            title:
                  <input name='title' />
                        </Form.Field>
                        <Form.Field>
                            author:
                  <input name='author' />
                        </Form.Field>
                        <Form.Field>
                            url:
                  <input name='url' />
                        </Form.Field>
                        <Button className='button submit-button' type="submit">create</Button>
                    </Form>
                    <Button className='button cancel-button' onClick={() => setNewNoteVisible(false)}>cancel</Button>
                </div>

                <div style={hideWhenVisible}>
                    <Button onClick={() => setNewNoteVisible(true)}>new blog</Button>
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
    if (props.login) {
        return newBlogForm()
    }
    // if no user logged in then hide
    return null
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        login: state.login,
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