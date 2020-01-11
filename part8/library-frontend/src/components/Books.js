import React, { useState, useEffect } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const [genres, setGenres] = useState([])

  useEffect(() => {
    if (!props.result.loading) {
      setGenres(Array.from(new Set(props.result.data.allBooks.map(b => b.genres).flat())))
    }
  }, [props.result.data, props.result.loading])

  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }

  const books = props.result.data.allBooks

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