import React from 'react'
import { connect } from 'react-redux'
import { loginUser, logoutUser } from '../reducers/userReducer'
import { newNotification } from '../reducers/notificationReducer'

const Login = (props) => {
    const loginForm = () => {
        if (props.user === null) {
            return (
                <div>
                    <h2>Log in to application</h2>
                    <form onSubmit={handleLogin}>
                        <div>
                            username
                  <input name='username' />
                        </div>
                        <div>
                            password
                  <input name='password' />
                        </div>
                        <button type="submit">login</button>
                    </form>
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

    const logout = () => {
        props.logoutUser()
    }

    if (!props.user) {
        return loginForm()
    } else {
        return (
            <div>
                <div>
                    <p>
                        {props.user.name} logged in
                        <button onClick={logout} type="logout">
                            logout
                        </button>
                    </p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = {
    loginUser,
    logoutUser,
    newNotification
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)