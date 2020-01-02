import loginService from '../services/login'
import blogService from '../services/blogs'

const loginReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.data
        case 'INIT_USER':
            return action.data
        case 'LOGOUT':
            localStorage.clear('loggedBlogappUser')
            return null
        default:
            return state
    }
}

export const initializeUser = (user) => {
    return {
        type: 'INIT_USER',
        data: {
            username: user.username,
            name: user.name,
            token: user.token
        }
    }
}

export const loginUser = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({
            username: username,
            password: password
        })

        window.localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(user)
        )

        blogService.setToken(user.token)

        dispatch({
            type: 'LOGIN',
            data: {
                username: user.username,
                name: user.name,
                token: user.token
            }
        })
    }
}

export const logoutUser = () => {
    return {
        type: 'LOGOUT'
    }
}

export default loginReducer