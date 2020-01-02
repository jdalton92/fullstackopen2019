import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = (props) => {
    if (props.login) {
        return (
            <div>
                {props.blogs
                    .sort((a, b) => b.likes - a.likes)
                    .map(blog =>
                        <div className="blog-style" key={blog.id}>
                            <Link to={`/blogs/${blog.id}`} >{blog.title}</Link>
                        </div>
                    )
                }
            </div>
        )
    }
    return null
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        login: state.login,
    }
}

const mapDispatchToProps = null

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Blogs)