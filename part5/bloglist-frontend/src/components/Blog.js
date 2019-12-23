import React, { useState } from 'react'

const Blog = ({ blog, addLikeHandler, removeBlogHandler, user }) => {
  const [blogHidden, setBlogHidden] = useState(true)

  const addLike = (event) => {
    event.preventDefault()
    addLikeHandler({ ...blog, likes: blog.likes + 1 })
  }

  const removeBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove post ${blog.title} by ${blog.author}?`)) {
      removeBlogHandler({ ...blog })
    }
  }

  return (
    <div className="blog-style">

      <div onClick={() => setBlogHidden(!blogHidden)}>
        {blog.title} {blog.author}
      </div>

      {blogHidden ? null :
        <div>
          <div>
            <a target='_blank' rel='noopener noreferrer' href={blog.url}>{blog.url}</a>
          </div>
          <div>
            {blog.likes} likes <button onClick={addLike}>like</button>
          </div>
          <div>
            added by {blog.user ? blog.user.name : 'admin'}
          </div>
          {blog.user
            ? blog.user.username === user.username
              ? <div>
                <button onClick={removeBlog}>remove</button>
              </div>
              : null
            : null
          }
        </div>
      }

    </div>
  )
}

export default Blog