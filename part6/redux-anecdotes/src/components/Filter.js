import React from 'react'
import { newSearch } from '../reducers/filterReducer'

const Filter = ({ store }) => {
    const handleChange = (event) => {
        store.dispatch(
            newSearch(event.target.value)
        )
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input name='search' onChange={handleChange} />
        </div>
    )
}

export default Filter