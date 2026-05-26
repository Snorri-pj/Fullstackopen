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

const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
  {
    name: 'Node.js',
    id:2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Midlewares',
        exercises: 7,
        id: 2
      }
    ]
  }
]

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Course courses={courses} />
    </div>
  )
}

export default App