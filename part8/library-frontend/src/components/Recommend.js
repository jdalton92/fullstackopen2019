import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { GET_BOOKS, ME } from '../App'


const Recommend = (props) => {
    const client = useApolloClient()
    const [filterBooks, setFilter] = useState([])
    const [genre, setGenre] = useState(null)
    useEffect(() => {
        recommendedData()
    }, [genre])

    const recommendedData = async () => {
        const me = await client.query({ query: ME })
        setGenre(me.data.me.favoriteGenre)
        const books = await client.query({
            query: GET_BOOKS,
            variables: {
                genre
            }
        })
        setFilter(books.data.allBooks)
    }

    if (!props.show) {
        return null
    }

    return (
        <div>
            <h2>recommendations</h2>

            <p>books based on your favourite genre <b>{genre}</b></p>
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