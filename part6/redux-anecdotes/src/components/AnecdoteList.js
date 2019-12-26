import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { newNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
    const anecdotes = store.getState().anecdote
    const filter = store.getState().filter
    const filterAnecdotes = anecdotes
        .filter(a => a.content.toUpperCase().includes(filter.toUpperCase()))
        .sort((a, b) => b.votes - a.votes)

    const vote = (id) => {
        store.dispatch(
            voteAnecdote(id)
        )
        store.dispatch(
            newNotification(`you voted ${anecdotes.find(a => a.id === id).content}`)
        )
        setTimeout(() => {
            store.dispatch(resetNotification())
        }, 5000)
    }

    return (
        <div>
            {filterAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList

