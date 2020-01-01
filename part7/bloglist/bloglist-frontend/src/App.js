import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Notification from './components/Notification'
import Login from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import blogService from './services/blogs'

import { initializeUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = (props) => {
  useEffect(() => {
    props.initializeBlogs()
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
    <div>
      <h1>blogs</h1>
      <Notification />
      <Login />
      <BlogForm />
      <Blogs />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user,
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  initializeUser,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)