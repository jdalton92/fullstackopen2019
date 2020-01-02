import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { logoutUser } from '../../reducers/loginReducer'
import { Button } from 'semantic-ui-react'

let Navigation = (props) => {
    const logout = () => {
        props.logoutUser()
        props.history.push('/')
    }

    return (
        <>
            {props.login
                ? <>
                    <Link to='/'>blogs</Link>
                    <Link to='/users'>users</Link>
                    <em>{props.login.name} logged in </em>
                    <Button onClick={logout} type="logout">
                        logout
                    </Button>
                </>
                : null
            }
        </>
    )
}

Navigation = withRouter(Navigation)

const mapStateToProps = (state) => {
    return {
        login: state.login,
    }
}

const mapDispatchToProps = {
    logoutUser
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navigation)