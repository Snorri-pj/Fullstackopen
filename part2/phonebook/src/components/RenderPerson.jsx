import Person from "./Person"

const RenderPerson = ({ persons }) => {
    return (
      <ul>
        {persons.map(person => 
        <Person key={person.id} person={person} number={person.number} />
        )}
      </ul>
    )
}

export default RenderPerson