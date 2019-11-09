import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => {
    // Return a button with input text/action
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    );
};

const Max = ({ maxVotes, anecdotes, votes }) => {
    let sumVotes = votes.reduce((a, b) => a + b, 0);
    if (sumVotes === 0) {
        return (
            <p>No feeback given</p>
        );
    } else {
        return (
            <div>
                <p>{anecdotes[maxVotes]}</p>
                <p>has {votes[maxVotes]} votes</p>
            </div>
        );
    };
};

const App = (props) => {
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

    const nextAnecdote = () => () => {
        const rand = Math.floor(Math.random() * anecdotes.length)
        setSelected(rand);
    };

    const vote = () => () => {
        const copy = [...votes]
        copy[selected] += 1;
        setVotes(copy);
    };

    const maxVotes = () => votes.indexOf(Math.max(...votes));

    return (
        <>
            <div>
                <h2>Anecdote of the day</h2>
                <div>
                    <p>{props.anecdotes[selected]}</p>
                    <p>has {votes[selected]} votes</p>
                </div>
                <Button handleClick={vote()} text="vote" />
                <Button handleClick={nextAnecdote()} text="next anecdote" />
            </div>
            <div>
                <h2>Anecdote with most votes</h2>
                <div>
                    <Max maxVotes={maxVotes()} anecdotes={anecdotes} votes={votes} />
                </div>
            </div>

        </>
    );
};

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
);