import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Result from './components/Result'

const App = () => {
  const [countryData, setCountryData] = useState([])
  const [newSearch, setNewSearch] = useState('')

  const countries = countryData.filter(country =>
    country.name.toUpperCase().includes(newSearch.toUpperCase()))
  const handleSearchChange = (event) => setNewSearch(event.target.value)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountryData(response.data)
      })
  }, [])

  return (
    <div>
      <div>
        <form>
          <div>
            find countries <input value={newSearch} onChange={handleSearchChange} />
          </div>
        </form>
      </div>
      <div>
        {
          (countries.length > 10)
            ? <p>Too many matches, specify another filter</p>
            : (countries.length > 1)
              ? countries.map(country => {
                return (
                  <p key={country.numericCode}>
                    {country.name}
                    <button type="button" onClick={() => setNewSearch(country.name)}>
                      show
                     </button>
                  </p >
                )
              })
              : (countries.length === 1)
                ? <Result resultCountry={countries[0]} />
                : null
        }
      </div>
    </div>
  )
}

export default App