const initialState = ''

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTER':
            return action.data.search
        default:
            return state
    }
}

export const newSearch = (search) => {
    return {
        type: 'FILTER',
        data: {
            search,
        }
    }
}

export default filterReducer