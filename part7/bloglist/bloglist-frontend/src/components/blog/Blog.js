import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Header, Form, Button, List } from 'semantic-ui-react'
import { likeBlog, deleteBlog, addComment } from '../../reducers/blogReducer'
import { newNotification } from '../../reducers/notificationReducer'

let Blog = (props) => {
    const addLike = (event) => {
        event.preventDefault()
        props.likeBlog(props.blog)
        props.newNotification(`${props.blog.title} liked`)
    }

    const removeBlog = (event) => {
        event.preventDefault()
        if (window.confirm(`Remove post ${props.blog.title} by ${props.blog.author}?`)) {
            props.deleteBlog(props.blog)
            props.newNotification(`${props.blog.title} removed`)
            props.history.push('/')
        }
    }

    const newComment = async (event) => {
        event.preventDefault()
        const comment = {
            comment: event.target.comment.value,
            date: Date.now()
        }
        event.target.comment.value = ''
        try {
            await props.addComment(props.blog, comment)
            props.newNotification('Comment added')
        } catch (e) {
            props.newNotification('Error')
        }
    }

    return (
        <div>
            <Header as='h1'>{props.blog.title}</Header>
            <p><a target='_blank' rel='noopener noreferrer' href={props.blog.url}>{props.blog.url}</a></p>
            <p>
                {props.blog.likes} likes
                <Button onClick={addLike}>
                    like
                </Button>
            </p>
            <p>added by {props.blog.user
                ? props.blog.user.username === props.login.username
                    ? props.blog.user.username
                    : props.login.username
                : 'admin'
            }</p>
            {props.blog.user
                ? props.blog.user.username === props.login.username
                    ? <div>
                        <Button onClick={removeBlog}>remove</Button>
                    </div>
                    : null
                : null
            }
            <Header as='h2'>comments</Header>
            <Form onSubmit={newComment}>
                <Form.Field>
                    <input id='comment' name='comment'></input>
                </Form.Field>
                <Button type='submit'>add comment</Button>
            </Form>
            <List as='ul'>
                {props.blog.comments
                    ? <>
                        {props.blog.comments.map(c => <List.Item as='li' key={c.date}>{c.comment}</List.Item>)}
                    </>
                    : null
                }
            </List>
        </div>
    )
}

Blog = withRouter(Blog)

const mapStateToProps = (state) => {
    return {
        login: state.login,
    }
}

const mapDispatchToProps = {
    likeBlog,
    newNotification,
    deleteBlog,
    addComment
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Blog)