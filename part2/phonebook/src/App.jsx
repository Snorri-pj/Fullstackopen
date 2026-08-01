import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { id: "1", name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      id: String(persons.length + 1),
    }

    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
          alert(`${newName} is already added to the phonebook.`)
          return
        }

    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <>name: </>
        <input
          value={newName}
          onChange={handleNameChange}
        />
        <br></br>
        <button type='submit'>add</button>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
        <Person key={person.id} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App
