const initialState = {
    pages: [],
    loading: true
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'PAGES_REQUESTED':
            return {
                pages: [],
                loading: true
            }
        case 'PAGES_LOADED':
            return {
                pages: action.payload,
                loading: false
            }
        default:
            return state
    }
}

export default reducer