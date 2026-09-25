import Person from "./Person"

const RenderPerson = ({ persons, deletePerson }) => {
    return (
      <ul>
        {persons.map(person => 
        <Person key={person.id} person={person} number={person.number} deletePerson={deletePerson} />
        )}
        
      </ul>
    )
}

export default RenderPerson