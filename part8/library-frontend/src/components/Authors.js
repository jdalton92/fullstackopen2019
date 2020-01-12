import React, { useState } from 'react'
import Select from 'react-select'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_BOOKS } from '../App'

const ALL_AUTHORS = gql`
  {
    allAuthors  {
      name
      born
      bookCount
      id
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo,
    ) {
      name
      born
      bookCount
    }
  }
`

const Authors = (props) => {
  const [author, setAuthor] = useState({})
  const [born, setBorn] = useState('')

  const authors = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: props.handleError,
    refetchQueries: [{ query: ALL_AUTHORS }, { query: GET_BOOKS }]
  })

  if (!props.show) {
    return null
  }

  if (authors.loading) {
    return <div>loading...</div>
  }

  const updateYear = async (e) => {
    e.preventDefault()
    const bornNum = Number(born)

    try {
      await editAuthor({
        variables: { name: author.value, setBornTo: bornNum }
      })
      setAuthor({})
      setBorn('')
    } catch (e) {
      console.log(e)
    }
  }

  const authorSelectList = authors.data.allAuthors.map(a => ({ value: a.name, label: a.name }))

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
          {authors.data.allAuthors.map(a =>
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