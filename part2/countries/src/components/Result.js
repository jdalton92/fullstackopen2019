import React from 'react'
import Languages from './Languages'
import Weather from './Weather'

const Result = ({ resultCountry, weatherData }) => {
    return (
        <div>
            <div>
                <h2>{resultCountry.name}</h2>
                <p>capital {resultCountry.capital}</p>
                <p>population {resultCountry.population}</p>
            </div>
            <div>
                <h3>languages</h3>
                <div>
                    <ul>
                        <Languages languages={resultCountry.languages} />
                    </ul>
                </div>
                <div>
                    <img src={resultCountry.flag} alt="result Flag"></img>
                </div>
            </div>
            <Weather country={resultCountry} />
        </div>
    )
}

export default Result