import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ store }) => {
    const anecdotes = store.getState()
    //order anecdotes by votes
    anecdotes.sort((a, b) => b.votes - a.votes)

    const vote = (id) => {
        store.dispatch(
            voteAnecdote(id)
        )
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
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

