import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route, Redirect
} from 'react-router-dom'
import { Container, Header } from 'semantic-ui-react'

//reducer function imports
import { initializeUser } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { getAllUsers } from './reducers/userReducer'

//nav component
import Navigation from './components/nav/Navigation'

//index components
import Notification from './components/index/Notification'
import Login from './components/index/LoginForm'
import BlogForm from './components/index/BlogForm'
import Blogs from './components/index/Blogs'
import blogService from './services/blogs'

//users components
import Users from './components/users/Users'
import User from './components/users/User'

//blog components
import Blog from './components/blog/Blog'

const App = (props) => {
  useEffect(() => {
    props.initializeBlogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    props.getAllUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.initializeUser(user)
      blogService.setToken(user.token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Router>
        <div>
          {props.login
            ? <Navigation />
            : null
          }
        </div>
        <Container>
          <Header as='h1'>blog app</Header>
          <Notification />
          <Route exact path='/' render={() =>
            props.login
              ? <>
                <BlogForm />
                <Blogs />
              </>
              : <Login />
          } />
          <Route exact path='/blogs/:id' render={({ match }) => (
            props.login
              ? <Blog blog={props.blogs.find(b => b.id === match.params.id)} />
              : <Redirect to='/' />
          )}
          />
          <Route exact path='/users' render={() =>
            props.login
              ? <Users />
              : <Redirect to='/' />
          } />
          <Route exact path='/users/:id' render={({ match }) =>
            props.login
              ? <User user={props.users.find(u => u.id === match.params.id)} />
              : <Redirect to='/' />
          } />
        </Container>
      </Router>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    users: state.users,
    login: state.login
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  initializeUser,
  getAllUsers
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)