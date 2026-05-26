const Course = ( {courses} ) => {
  return(
    <div>
      <Header course={courses[0].name} />
      <Content parts={courses[0].parts} />
      <Total parts={courses[0].parts} />
      <Header course={courses[1].name} />
      <Content parts={courses[1].parts} />
      <Total parts={courses[1].parts} />
    </div>
  )
}

const Header = (props) => <h2>{props.course}</h2>

const Content = (props) => {
  console.log(props)
  return (
    <div>
        {props.parts.map(part =>
          <Part key={part.id} part={part} />
        )}
    </div>
  )
}

const Part = (props) => {
  return(
  <p>
    {props.part.name} {props.part.exercises}
  </p>
  )
}

const Total = (props) => {
  const sum = props.parts.reduce((a, part) => a + part.exercises, 0)
  return (
    <p>
     <b>total of {sum} exercises</b>
    </p>
  )
}

export default Course