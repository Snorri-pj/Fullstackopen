import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <div>{props.text} {props.value}</div>
  )
}

const Statistics = (props) => {

  const averageScore = () => {
    if (props.all === 0) return 0
    return (props.good - props.bad) / props.all
  }

  const positivePercentage = () => {
    if (props.all === 0) return 
    return (
    `${(props.good / props.all) * 100}%`
    )
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
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.all} />
      <StatisticLine text="average" value={averageScore()} />
      <StatisticLine text="positive" value={positivePercentage()} />
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
