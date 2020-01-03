import React from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { logoutUser } from '../../reducers/loginReducer'
import { Button } from 'semantic-ui-react'
import './navigation.css'

let Navigation = (props) => {
    const logout = () => {
        props.logoutUser()
        props.history.push('/')
    }

    return (
        <nav className='nav-header'>
            <div className='nav-links'>
                <NavLink to='/' activeClassName='nav-link blogs'>blogs</NavLink>
            </div>
            <div className='nav-links'>
                <NavLink to='/users' activeClassName='nav-link users'>users</NavLink>
            </div>
            <div className='nav-links'>
                {props.login.name} logged in <Button onClick={logout} type="logout">logout</Button>
            </div>
        </nav>
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