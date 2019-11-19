import React, { useState, useEffect } from 'react'
import Rows from './components/Rows'
import personService from './services/persons'
import Notifications from './components/Notifications'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [newMessage, setMessage] = useState(null)
  const [className, setClass] = useState('notification-green')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const updateNumber = () => {
    const result = window.confirm(`${newName} is already added to phonebook, replace the 
    old number with a new one?`)
    if (result) {
      const currentDetails = persons.filter(person =>
        person.name === newName)
      const updateDetails = currentDetails[0]
      const newDetails = { ...updateDetails, number: newNumber }

      personService
        .update(updateDetails.id, newDetails)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id === updateDetails.id
            ? returnedPerson
            : person))
          setNewName('')
          setNewNumber('')
          setMessage(`Updated ${newDetails.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 3500)
        })
        .catch(error => {
          setClass('notification-red')
          setMessage(`Information on ${updateDetails.name} has already removed from server`)
          setTimeout(() => {
            setMessage(null)
          }, 3500)
        })
    } else {
      return
    }
  }

  const addName = (event) => {
    event.preventDefault()
    if (persons.filter(person => person.name === newName).length > 0) {
      updateNumber()
    } else {
      const newID = () => '_' + Math.random().toString(36).substr(2, 9);
      const nameObject = {
        name: newName,
        number: newNumber,
        id: newID(),
      }

      personService
        .create(nameObject)
        .then(data => {
          setPersons(persons.concat(data))
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${nameObject.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 3500)
        })
    }
  }

  const filterPersons = persons.filter(person =>
    person.name.toUpperCase().includes(newSearch.toUpperCase()))

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setNewSearch(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notifications message={newMessage} className={className} />
      <div>
        <form>
          <div>
            filter shown with <input value={newSearch} onChange={handleSearchChange} />
          </div>
        </form>
      </div>
      <div>
        <h2>add a new</h2>
        <form onSubmit={addName}>
          <div>
            name:
            <input value={newName} onChange={handleNameChange} />
          </div>
          <div>
            number:
            <input value={newNumber} onChange={handleNumberChange} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
      <div>
        <h2>Numbers</h2>
        <Rows
          persons={filterPersons}
          setPersons={setPersons}
          setMessage={setMessage}
          setClass={setClass}
        />
      </div>
    </div>
  )
}

export default App