import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import AddNew from './components/AddNew'
import RenderPerson from './components/RenderPerson'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      number: newNumber,
      name: newName,
      id: String(persons.length + 1),
    }

    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
          alert(`${newName} is already added to the phonebook.`)
          return
        }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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
      <Filter value={newFilter} onChange={handleFilter} />
      <h2>add a new</h2>
      <AddNew onSubmit={addPerson} nameValue={newName} onNameChange={handleNameChange} numberValue={newNumber} onNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <RenderPerson persons={personsToShow} />
    </div>
  )
}

export default App
