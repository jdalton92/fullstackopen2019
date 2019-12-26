import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'

const store = createStore(anecdoteReducer)

const render = () => {
  ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)