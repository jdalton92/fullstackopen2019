import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { GET_BOOKS } from '../App'

const Books = (props) => {
  const client = useApolloClient(GET_BOOKS)
  const [genre, setGenre] = useState(null)
  const [genres, setGenres] = useState([])
  const [books, setBooks] = useState({})

  useEffect(() => {
    const filterData = async () => {
      const allBooks = await client.query({ query: GET_BOOKS })
      setGenres(Array.from(new Set(allBooks.data.allBooks.map(b => b.genres).flat())))
      if (genre) {
        setBooks(allBooks.data.allBooks.filter(b => b.genres.includes(genre)))
      } else {
        setBooks(allBooks.data.allBooks)
      }

    }
    filterData()
  }, [genre])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <p>in genre <b>{genre ? genre : 'all'}</b></p>

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
          {(genre ? books.filter(b => b.genres.includes(genre)) : books)
            .map(b =>
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            )}
        </tbody>
      </table>
      <div>
        {
          genres.map((g) => <button type="button" onClick={() => { setGenre(g) }} key={g}>{g}</button>)
        }
        <button type="button" onClick={() => { setGenre(null) }} >all</button>
      </div>
    </div>
  )
}

export default Books