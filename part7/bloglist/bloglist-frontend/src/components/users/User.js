import React from 'react'
import { List, Header } from 'semantic-ui-react'

const User = (props) => {
    if (props.user === undefined) {
        return null
    }

    return (
        <>
            <Header as='h1'>{props.user.username}</Header>
            <Header as='h2'>added blogs</Header>
            <List as='ul'>
                {props.user.blogs.map(b =>
                    <List.Item as='li' key={b.id}>{b.title}</List.Item>
                )}
            </List>
        </>
    )
}

export default User