import React from 'react';
import { newAnecdote } from '../reducers/anecdoteReducer'
import { newNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({ store }) => {
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        store.dispatch(
            newAnecdote(content)
        )
        store.dispatch(
            newNotification(`Added ${content}`)
        )
        setTimeout(() => {
            store.dispatch(resetNotification())
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

export default AnecdoteForm
