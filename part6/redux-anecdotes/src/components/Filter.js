import React from 'react'
import { connect } from 'react-redux'
import { newSearch } from '../reducers/filterReducer'

const Filter = (props) => {
    const handleChange = (event) => {
        props.newSearch(event.target.value)
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

const mapDispatchToProps = {
    newSearch
}

export default connect(
    null,
    mapDispatchToProps
)(Filter)