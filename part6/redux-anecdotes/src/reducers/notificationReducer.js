const initialState = ''

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NOTIFICATION':
            return action.notification
        case 'RESET_NOTIFICATION':
            return initialState
        default:
            return state
    }
}

export const newNotification = (notification, seconds) => {
    const milliseconds = seconds * 1000
    return async dispatch => {
        dispatch({
            type: 'NOTIFICATION',
            notification
        })
        setTimeout(() => {
            dispatch({
                type: 'RESET_NOTIFICATION'
            })
        }, milliseconds)
    }
}

export default notificationReducer