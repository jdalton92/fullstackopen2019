import React from 'react'
import personService from '../services/persons'

const Rows = ({ persons, setPersons, setMessage, setClass }) => {
  const handleClick = (deletePerson) => () => {
    const result = window.confirm(`Delete ${deletePerson.name}?`)
    if (result) {
      const newPersons = persons.filter(person =>
        person.id !== deletePerson.id
      )
      personService
        .remove(deletePerson.id, persons)
      setPersons(newPersons)
      setClass('notification-red')
      setMessage(`Removed ${deletePerson.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 3500)
    } else {
      return
    }
  }

  return (
    persons.map(person =>
      <p key={person.id}>{person.name} {person.number}
        <button onClick={handleClick(person)}>delete</button>
      </p>
    )
  )
}

export default Rows