import React, { useState } from 'react'
import Select from 'react-select'

const Authors = (props) => {
  const [author, setAuthor] = useState({})
  const [born, setBorn] = useState('')

  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }

  const updateYear = async (e) => {
    e.preventDefault()
    const bornNum = Number(born)

    try {
      await props.editAuthor({
        variables: { name: author.value, setBornTo: bornNum }
      })
      setAuthor({})
      setBorn('')
    } catch (e) {
      console.log(e)
    }
  }

  const authors = props.result.data.allAuthors
  const authorSelectList = authors.map(a => ({ value: a.name, label: a.name }))

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={updateYear}>
        <div>
          name
          <Select
            value={author}
            onChange={(event) => setAuthor(event)}
            options={authorSelectList}
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>

    </div>
  )
}

export default Authors