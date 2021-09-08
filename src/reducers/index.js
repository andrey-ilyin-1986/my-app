import   ActionTypes    from '../actions/types'

const initialState = {
    data: [],
    loading: true,
    saving: false,
    error: null
}

const moveItem          = ({ id, from, to, data })     => {
    return {
        ...data,
        [to]: [
            ...data[to],
            ...data[from].filter(item => item.id === id)
        ],
        [from]: [
            ...data[from].filter(item => item.id !== id)
        ]
    }
}

const reducer           = (state = initialState, action)    => {
    switch(action.type) {
        case ActionTypes.fetchDataRequest:
            return {
                ...state,
                data: [],
                loading: true,
                error: null
            }
        case ActionTypes.fetchDataSuccess:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null
            }
        case ActionTypes.fetchDataError:
            return {
                ...state,
                data: [],
                loading: false,
                error: action.payload
            }
        case ActionTypes.saveDataRequest:
            return {
                ...state,
                saving: true,
                error: null
            }
        case ActionTypes.saveDataSuccess:
            return {
                ...state,
                saving: false,
                error: null
            }
        case ActionTypes.saveDataError:
            return {
                ...state,
                saving: false,
                error: action.payload
            }
        case ActionTypes.itemsMoved:
            return {
                ...state,
                data: action.payload.reduce((data, item) => moveItem({ ...item, data }), state.data)
            }
        default:
            return state
    }
}

export default reducer