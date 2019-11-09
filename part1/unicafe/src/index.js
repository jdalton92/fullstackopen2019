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

const Statistic = ({ value, text, symbol }) => {
    // Return a single statistic
    return (
        <tr>
            <td>{text}</td>
            <td>{value} {symbol}</td>
        </tr>
    );
};

const Statistics = ({ good, neutral, bad }) => {
    // Render statistic metrics
    const all = good + neutral + bad;
    const avg = (good - bad) / all;

    if (all === 0) {
        return (
            <p>No feeback given</p>
        )
    } else {
        return (
            <table>
                <tbody>
                    <Statistic value={good} text="good" />
                    <Statistic value={neutral} text="neutral" />
                    <Statistic value={bad} text="bad" />
                    <Statistic value={all} text="all" />
                    <Statistic value={avg} text="average" />
                    <Statistic value={((100 * good) / all)} text="positive" symbol="%" />
                </tbody>
            </table>
        );
    };
};

const App = (props) => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const handleGood = (value) => () => setGood(value);
    const handleNeutral = (value) => () => setNeutral(value);
    const handleBad = (value) => () => setBad(value);

    return (
        <>
            <div>
                <h2>give feedback</h2>
                <Button handleClick={handleGood(good + 1)} text="good" />
                <Button handleClick={handleNeutral(neutral + 1)} text="neutral" />
                <Button handleClick={handleBad(bad + 1)} text="bad" />
            </div>
            <div>
                <h2>statistics</h2>
                <Statistics good={good} neutral={neutral} bad={bad} />
            </div>
        </>
    );
};

ReactDOM.render(<App />,
    document.getElementById('root')
);