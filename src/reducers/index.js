const initialState = {
    pages: [],
    loading: true,
    error: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_PAGES_REQUEST':
            return {
                pages: [],
                loading: true,
                error: null
            }
        case 'FETCH_PAGES_SUCCESS':
            return {
                pages: action.payload,
                loading: false,
                error: null
            }
        case 'FETCH_PAGES_FAILURE':
            return {
                pages: [],
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export default reducer