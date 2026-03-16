import { useState } from 'react'

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
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {averageScore()}</p>
      <p>positive {positivePercentage()}%</p>
    </div>
  )
}

export default App
