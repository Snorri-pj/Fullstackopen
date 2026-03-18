import { useState } from 'react'

const Statistics = (props) => {

  const averageScore = () => {
    if (props.all == 0) return 0
    return (props.good - props.bad) / props.all
  }

  const positivePercentage = () => {
    if (props.all === 0) return 0
    return (props.good / props.all) * 100
  }

  if (props.all === 0) 
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )

  return (
    <div>
      <h1>statistics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.all}</p>
      <p>average {averageScore()}</p>
      <p>positive {positivePercentage()}%</p>
    </div>
  )
}

const Button = (props) => 
  <button onClick={props.onClick}>{props.text}</button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad

  const setToGood = (newValue) => {
    setGood(newValue)
  }

  const setToNeutral = (newValue) => {
    setNeutral(newValue)
  }

  const setToBad = (newValue) => {
    setBad(newValue)
  }

  const positivePercentage = () => {
    if (all === 0) return 0
    return (good / all) * 100
  }

  const averageScore = () => {
    if (all == 0) return 0
    return (good - bad) / all
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setToGood(good + 1)} text='good' />
      <Button onClick={() => setToNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setToBad(bad + 1)} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

export default App
