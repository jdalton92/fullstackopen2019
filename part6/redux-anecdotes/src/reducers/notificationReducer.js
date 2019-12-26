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

export const newNotification = (notification) => {
    return {
        type: 'NOTIFICATION',
        notification
    }
}

export const resetNotification = () => {
    return { type: 'RESET_NOTIFICATION' }
}

export default notificationReducer