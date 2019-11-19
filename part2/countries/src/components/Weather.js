import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
    const [weatherData, setWeatherData] = useState([])
    const capital = country.capital

    useEffect(() => {
        const API_KEY = 'bc4a78837fee65baa51a2399b7a246f5'
        const query = capital
        const URL = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${query}`
        axios
            .get(URL)
            .then(response => {
                setWeatherData(response.data)
            })
    }, [capital])

    return (
        (typeof weatherData.length === "undefined")
            ? <div>
                <h3> Weather in {capital}</h3>
                <p><b>temperature: </b>{weatherData.current.temperature} Celcius</p>
                <p><b>wind: </b>{weatherData.current.wind_speed} kph direction {weatherData.current.wind_dir} </p>
            </div >
            : <p>Error in weather app</p>
    )
}

export default Weather