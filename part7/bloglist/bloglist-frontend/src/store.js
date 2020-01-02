import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import loginReducer from './reducers/loginReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
    blogs: blogReducer,
    filter: filterReducer,
    login: loginReducer,
    users: userReducer,
    notification: notificationReducer
})

const store = createStore(reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store