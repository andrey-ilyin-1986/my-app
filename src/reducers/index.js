
const initialState = {
    pages: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'PAGES_LOADED':
            return {
                pages: action.payload
            }

        default:
            return state;
    }
}

export default reducer;