import React from 'react'
import App from '../App'
import Result from './Result'

const selectCountry = (country) => {
    setNewSearch(country)
}

const Rows = ({ countries }) => {
    if (countries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if (countries.length > 1) {
        return (
            countries.map(country => {
                return (
                    <p key={country.numericCode}>
                        {country.name}
                        <button type="button" onClick={() => selectCountry(country)}>
                            show
                        </button>
                    </p >
                )
            })
        )
    } else if (countries.length === 1) {
        const resultCountry = countries[0]
        return (
            <Result resultCountry={resultCountry} />
        )
    } else {
        return null
    }
}

export default Rows