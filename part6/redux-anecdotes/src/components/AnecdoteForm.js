import React from 'react'
import { connect } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { newNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        props.newAnecdote(content)
        props.newNotification(`Added ${content}`)
        setTimeout(() => {
            props.resetNotification()
        }, 5000)
        event.target.anecdote.value = ''
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    newAnecdote,
    newNotification,
    resetNotification
}

export default connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)
