import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import AddNew from './components/AddNew'
import RenderPerson from './components/RenderPerson'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState({ message: null, type: null })

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      }) 
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      number: newNumber,
      name: newName,
      id: String(persons.length + 1),
    }

    const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if (existingPerson) {
          if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
            personService
              .update(existingPerson.id, { ...existingPerson, number: newNumber })
              .then(response => {
                setPersons(persons.map(person =>
                  person.id === existingPerson.id ? response.data : person
                ))
                setNotification({
                  message: `Updated ${existingPerson.name}'s number.`,
                  type: 'success'
                
                })
                setTimeout(() => {
                  setNotification({ message: null, type: null })
                }, 5000)
                setNewName('')
                setNewNumber('')
              })
              .catch(error => {
                setNotification({
                  message: `Information about ${existingPerson.name} has already been removed`,
                  type: 'error'
                })
                setTimeout(() => {
                  setNotification({ message: null, type: null })
                }, 5000)
                setPersons(persons.filter(p => p.id !== existingPerson.id))
              }
              )
          }
          return
        }

    personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNotification({
                  message: `Added ${personObject.name}.`,
                  type: 'success'
                })
                setTimeout(() => {
                  setNotification({ message: null, type: null })
                }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
                setNotification({
                  message: `Failed to add ${personObject.name}`,
                  type: 'error'
                })
                setTimeout(() => {
                  setNotification({ message: null, type: null })
                }, 5000)
              })
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(setPersons(persons.filter(p => p.id !== id)))
        .catch(error => {
                setNotification({
                  message: `Information about ${person.name} has already been removed`,
                  type: 'error'
                })
                setTimeout(() => {
                  setNotification({ message: null, type: null })
                }, 5000)
                setPersons(persons.filter(p => p.id !== id))
              })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }   

  const handleFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter value={newFilter} onChange={handleFilter} />
      <h2>add a new</h2>
      <AddNew onSubmit={addPerson} nameValue={newName} onNameChange={handleNameChange} numberValue={newNumber} onNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <RenderPerson persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
