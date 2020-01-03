import React from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../reducers/loginReducer'
import { newNotification } from '../../reducers/notificationReducer'
import { Form, Button, Header } from 'semantic-ui-react'

const Login = (props) => {
    const loginForm = () => {
        if (props.login === null) {
            return (
                <div>
                    <Header as='h2'>Log in to application</Header>
                    <Form onSubmit={handleLogin}>
                        <Form.Field>
                            username
                  <input id='username' name='username' />
                        </Form.Field>
                        <Form.Field>
                            password
                  <input id='password' name='password' />
                        </Form.Field>
                        <Button type="submit">login</Button>
                    </Form>
                </div>
            )
        }
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        try {
            await props.loginUser(username, password)
        } catch (e) {
            props.newNotification('invalid login details')
        }
    }

    if (!props.login) {
        return loginForm()
    } else {
        return null
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
    }
}

const mapDispatchToProps = {
    loginUser,
    newNotification
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)