import React, { useState, useEffect } from 'react'

const Recommend = (props) => {
    const [filterBooks, setFilter] = useState([])
    useEffect(() => {
        if (props.books.data && props.me.data) {
            setFilter(props.books.data.allBooks.filter(b =>
                b.genres.includes(props.me.data.me.favoriteGenre)
            ))
        }
    }, [props.books.data, props.me.data])

    if (!props.show) {
        return null
    }

    if (props.books.loading) {
        return <div>loading...</div>
    }

    const newBookList = props.books({
        variables: {
            genre: props.me.data.me.favoriteGenre
        }
    })

    console.log('newbooklist', newBookList)

    return (
        <div>
            <h2>recommendations</h2>

            <p>books based on your favourite genre <b>{props.me.data.me.favoriteGenre}</b></p>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            author
                        </th>
                        <th>
                            published
                        </th>
                    </tr>
                    {filterBooks.map(b =>
                        <tr key={b.id}>
                            <td>{b.title}</td>
                            <td>{b.author.name}</td>
                            <td>{b.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Recommend