import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect (() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  const handleChange = (effect) => {
    const searchText = effect.target.value
    console.log(effect.target.value)
    setValue(effect.target.value)

    const filtered = allCountries.filter(country => 
      country.name.common.toLowerCase().includes(searchText.toLowerCase())
    )
    setFilteredCountries(filtered)
    if (searchText.length === 0) {
      setFilteredCountries([])
    }
  }

  const handleSelectedCountry = (country) => {
    console.log(country.name.common)
    setFilteredCountries([country])
  }

   



  return (
    <div>
      <form>
        country: <input value={value} onChange={handleChange} />
      </form>
      {filteredCountries.length > 10 ? (
        <div>Too many matches, specify another filter</div>
        ) : filteredCountries.length === 1 ? (
          <div>
          <h1>{filteredCountries[0].name.common}</h1>
                <div>capital: {filteredCountries[0].capital}</div>
                <div>area: {filteredCountries[0].area}</div>
                <h2>Languages</h2>
                <ul>
                  {Object.values(filteredCountries[0].languages || {}).map(lang => <li>{lang}</li>)}
                </ul>
                <img src={filteredCountries[0].flags.png} />
          </div>         
        ) : ( 
          filteredCountries.map(country => 
        <div>
          {country.name.common} <button onClick={() => handleSelectedCountry(country)}>Show</button>
        </div>
           )
        )}
    </div>
  )
}

export default App