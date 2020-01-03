import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const Users = (props) => {

    return (
        <div>
            <h1>Users</h1>
            <Table striped celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell>blogs created</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.users
                        .map(user => (
                            <Table.Row key={user.id}>
                                <Table.Cell><Link to={`/users/${user.id}`} id={user.username}>{user.username}</Link></Table.Cell>
                                <Table.Cell>{props.users.filter(u => u.id === user.id)[0].blogs.length}</Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        users: state.users,
    }
}

const mapDispatchToProps = null

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Users)