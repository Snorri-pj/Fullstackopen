import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { id: "1", name: 'Arto Hellas', number: '040-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type='submit'>add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
        <Person key={person.id} person={person} number={person.number} />
        )}
      </ul>
    </div>
  )
}

export default App
