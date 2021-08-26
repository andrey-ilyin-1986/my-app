const initialState = {
    data: [],
    loading: true,
    saving: false,
    error: null
}

const getItemInfo = (item, data) => {
    const parent        = data.filter(parent=>parent.data.findIndex(child=>child.id === item.id) > -1)[0]
    const parentIdx     = data.findIndex(el=>el.id === parent.id)
    const childIdx      = parent.data.findIndex(child=>child.id === item.id)
    const prevParent    = data[parentIdx - 1]
    const nextParent    = data[parentIdx + 1]
    return { childIdx, parentIdx, parent, prevParent, nextParent }
}

const moveItemToLeft = (item, data) => {
    const { childIdx, parentIdx, parent, prevParent } = getItemInfo(item, data)
    const newParent = {
        ...parent,
        data:[
            ...parent.data.slice(0, childIdx),
            ...parent.data.slice(childIdx + 1)
        ]
    }
    const newPrevParent = {
        ...prevParent,
        data:[
            ...prevParent.data,
            {
                ...parent.data[childIdx]
            }
        ]
    }
    return [
        ...data.slice(0, parentIdx - 1),
        newPrevParent,
        newParent,
        ...data.slice(parentIdx + 1)
    ]
}

const moveItemToRight = (item, data) => {
    const { childIdx, parentIdx, parent, nextParent } = getItemInfo(item, data)
    const newParent = {
        ...parent,
        data:[
            ...parent.data.slice(0, childIdx),
            ...parent.data.slice(childIdx + 1)
        ]
    }
    const newNextParent = {
        ...nextParent,
        data:[
            ...nextParent.data,
            {
                ...parent.data[childIdx]
            }
        ]
    }
    return [
        ...data.slice(0, parentIdx),
        newParent,
        newNextParent,
        ...data.slice(parentIdx + 2)
    ]
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_DATA_REQUEST':
            return {
                ...state,
                data: [],
                loading: true,
                error: null
            }
        case 'FETCH_DATA_SUCCESS':
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null
            }
        case 'FETCH_DATA_ERROR':
            return {
                ...state,
                data: [],
                loading: false,
                error: action.payload
            }
        case 'SAVE_DATA_REQUEST':
            return {
                ...state,
                saving: true,
                error: null
            }
        case 'SAVE_DATA_SUCCESS':
            return {
                ...state,
                saving: false,
                error: null
            }
        case 'SAVE_DATA_ERROR':
            return {
                ...state,
                saving: false,
                error: action.payload
            }
        case 'ITEM_MOVED_TO_LEFT':
            return {
                ...state,
                data: moveItemToLeft(action.payload, state.data)
            }
        case 'ITEM_MOVED_TO_RIGHT':
            return {
                ...state,
                data: moveItemToRight(action.payload, state.data)
            }
        default:
            return state
    }
}

export default reducer