import userService from '../services/users'

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_ALL_USERS':
            return action.data
        default:
            return state
    }
}

export const getAllUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch({
            type: 'GET_ALL_USERS',
            data: users
        })
    }
}

export default userReducer