const initialState = {
    data: [],
    loading: true,
    saving: false,
    error: null
}

const getItemInfo       = (item, data)                  => {
    const pages         = Object.keys(data)
    const currentPage   = pages.filter(parent=>data[parent].findIndex(child=>child.id === item.id) > -1)[0]
    const pageIdx       = pages.findIndex(el=>el === currentPage)
    const itemIdx       = data[currentPage].findIndex(child=>child.id === item.id)
    const prevPage      = pages[pageIdx - 1]
    const nextPage      = pages[pageIdx + 1]
    return { itemIdx, currentPage, prevPage, nextPage }
}

const moveItem          = (itemIdx, from, to, data)     => {
    return {
        ...data,
        [to]: [
            ...data[to],
            { ...data[from][itemIdx] }
        ],
        [from]: [
            ...data[from].slice(0, itemIdx),
            ...data[from].slice(itemIdx + 1)
        ]
    }
}

const moveItemToLeft    = (item, data)                  => {
    const { itemIdx, currentPage, prevPage } = getItemInfo(item, data)
    return moveItem(itemIdx, currentPage, prevPage, data)
}

const moveItemToRight   = (item, data)                  => {
    const { itemIdx, currentPage, nextPage } = getItemInfo(item, data)
    return moveItem(itemIdx, currentPage, nextPage, data)
}

const moveItemsToLeft     = (items, data)               => items.reduce((data, item)=>moveItemToLeft(item, data), data)

const moveItemsToRight    = (items, data)               => items.reduce((data, item)=>moveItemToRight(item, data), data)

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
        case 'ITEMS_MOVED_TO_LEFT':
            return {
                ...state,
                data: moveItemsToLeft(action.payload, state.data)
            }
        case 'ITEMS_MOVED_TO_RIGHT':
            return {
                ...state,
                data: moveItemsToRight(action.payload, state.data)
            }
        default:
            return state
    }
}

export default reducer