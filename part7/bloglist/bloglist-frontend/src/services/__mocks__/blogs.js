const blogs = [
    {
        title: "Test Title 1",
        author: "Test Author 1",
        url: "Test Url 1",
        likes: 1,
        user: {
            username: "test1",
            name: "test1",
            id: "5d9f92ad7d342223de435943"
        },
        id: "6d9f92ad7d342223de435943"
    },
    {
        title: "Test Title 2",
        author: "Test Author 2",
        url: "Test Url 2",
        likes: 2,
        user: {
            username: "test1",
            name: "test1",
            id: "5d9f92ad7d342223de435943"
        },
        id: "7d9f92ad7d342223de435943"
    }
]

const getAll = () => {
    return Promise.resolve(blogs);
}

const setToken = (user) => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
}

export default { getAll, setToken }