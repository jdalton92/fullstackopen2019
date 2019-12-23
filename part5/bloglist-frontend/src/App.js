import React, { useState, useEffect } from 'react';
import Notification from './components/Notification'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [messageClass, setMessageClass] = useState('notification-green')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newNoteVisible, setNewNoteVisible] = useState(false)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessageClass('notification-red')
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    if (user === null) {
      return (
        <div>
          <h2>Log in to application</h2>
          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
              <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      )
    }
  }

  const logout = () => {
    localStorage.clear("loggedBlogappUser")
    setUser(null)
  };

  const blogForm = () => {
    const hideWhenVisible = { display: newNoteVisible ? 'none' : '' }
    const showWhenVisible = { display: newNoteVisible ? '' : 'none' }

    return (
      <div>
        <div style={showWhenVisible}>
          <form onSubmit={addBlog}>
            <div>
              title:
        <input
                type="text"
                value={newTitle}
                name="Title"
                onChange={({ target }) => setNewTitle(target.value)}
              />
            </div>
            <div>
              author:
        <input
                type="text"
                value={newAuthor}
                name="Author"
                onChange={({ target }) => setNewAuthor(target.value)}
              />
            </div>
            <div>
              url:
        <input
                type="text"
                value={newUrl}
                name="Url"
                onChange={({ target }) => setNewUrl(target.value)}
              />
            </div>
            <button type="submit">create</button>
          </form>
          <button onClick={() => setNewNoteVisible(false)}>cancel</button>
        </div>

        <div style={hideWhenVisible}>
          <button onClick={() => setNewNoteVisible(true)}>new note</button>
        </div>
      </div>
    )
  }

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      }
      await blogService.create(blogObject)
      await blogService
        .getAll()
        .then(initialBlogs => setBlogs(initialBlogs))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      setMessageClass('notification-green')
      setMessage(`A new blog added: ${blogObject.title} by ${blogObject.author}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessageClass('notification-red')
      setMessage('Invalid blog data')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addLikeHandler = async (blogObject) => {
    try {
      await blogService.addLike(blogObject)
      setBlogs(blogs.map(blog => (blog.id === blogObject.id ? blogObject : blog)))
    } catch (exception) {
      setMessageClass('notification-red')
      setMessage(`${exception}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const removeBlogHandler = async (blogObject) => {
    try {
      await blogService.deleteBlog(blogObject)
      setBlogs(blogs.filter(blog => (blog.id !== blogObject.id)))
      setMessageClass('notification-green')
      setMessage(`${blogObject.title} removed`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessageClass('notification-red')
      setMessage(`${exception}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h1>blogs</h1>

      <Notification message={message} messageClass={messageClass} />

      {user === null ? loginForm() :
        <div>
          <div>
            <p>
              {user.name} logged in
              <button onClick={logout} type="logout">
                logout
              </button>
            </p>
            {blogForm()}
          </div>
          <div>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map(blog =>
                <Blog
                  key={blog.id}
                  blog={blog}
                  addLikeHandler={addLikeHandler}
                  removeBlogHandler={removeBlogHandler}
                  user={user}
                />
              )}
          </div>
        </div>
      }
    </div>
  )
}

export default App;
