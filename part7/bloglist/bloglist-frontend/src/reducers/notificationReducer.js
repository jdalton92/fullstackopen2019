const initialState = ''

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NOTIFICATION':
            return action.data
        case 'RESET_NOTIFICATION':
            return initialState
        default:
            return state
    }
}

export const newNotification = (notification) => {
    return async dispatch => {
        dispatch({
            type: 'NOTIFICATION',
            data: notification
        })
        setTimeout(() => {
            dispatch({
                type: 'RESET_NOTIFICATION'
            })
        }, 5000)
    }
}

export default notificationReducer