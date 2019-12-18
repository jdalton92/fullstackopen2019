import React from 'react'

const Notification = ({ message, messageClass }) => {
    if (message === null) {
        return null
    }

    return (
        <div class={messageClass}>
            {message}
        </div>
    )
}

export default Notification 