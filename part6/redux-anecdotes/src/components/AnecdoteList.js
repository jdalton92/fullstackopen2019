import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const vote = (anecdote) => {
        props.voteAnecdote(anecdote)
        props.newNotification(`you voted ${anecdote.content}`, 5)
    }

    return (
        <div>
            {props.anecdotesToShow.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )
            }
        </div >
    )
}

const anecdotesToShow = ({ anecdote, filter }) => {
    return anecdote
        .filter(a => a.content.toUpperCase().includes(filter.toUpperCase()))
        .sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
    return {
        anecdotesToShow: anecdotesToShow(state),
        filter: state.filter,
    }
}

const mapDispatchToProps = {
    voteAnecdote,
    newNotification
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)