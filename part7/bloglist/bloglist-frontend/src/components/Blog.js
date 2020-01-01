import React, { useState } from 'react'

const Blog = ({ blog, deleteBlog, likeBlog, user }) => {
  const [blogHidden, setBlogHidden] = useState(true)

  return (
    <div className="blog-style">

      <div className="title" onClick={() => setBlogHidden(!blogHidden)}>
        {blog.title} {blog.author}
      </div>

      {blogHidden ? null :
        <div>
          <div>
            <a target='_blank' rel='noopener noreferrer' href={blog.url}>{blog.url}</a>
          </div>
          <div>
            {blog.likes} likes <button onClick={likeBlog}>like</button>
          </div>
          <div>
            added by {blog.user
              ? blog.user.username === user.username
                ? blog.user.username
                : user.username
              : 'admin'
            }
          </div>
          {blog.user
            ? blog.user.username === user.username
              ? <div>
                <button onClick={deleteBlog}>remove</button>
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
