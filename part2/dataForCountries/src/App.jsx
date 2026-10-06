import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [weather, setWeather] = useState(null)

  useEffect (() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  useEffect (() => {
    if (filteredCountries.length === 1) {
      const api_key = import.meta.env.VITE_WEATHER_API_KEY
      const lat = filteredCountries[0].latlng[0]
      const lon = filteredCountries[0].latlng[1]

      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
        .then(response => {
          setWeather(response.data)
        })
    }
  }, [filteredCountries])

  const handleChange = (effect) => {
    const searchText = effect.target.value
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
          <h1>Weather in {filteredCountries[0].capital}</h1>
          <div>Temperature: {weather?.main?.temp} celcius</div>
          <img
            src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
            alt="weather icon"
          />
          <div>Wind: {weather?.wind?.speed}</div>
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