import   ActionTypes    from '../actions/types'

const initialState = {
    data: [],
    loading: true,
    saving: false,
    error: null
}

const getItemInfo       = ({ item, data })                  => {
    const pages         = Object.keys(data)
    const currentPage   = pages.filter(parent=>data[parent].findIndex(child=>child.id === item.id) > -1)[0]
    const pageIdx       = pages.findIndex(el=>el === currentPage)
    const itemIdx       = data[currentPage].findIndex(child=>child.id === item.id)
    const prevPage      = pages[pageIdx - 1]
    const nextPage      = pages[pageIdx + 1]
    return { itemIdx, currentPage, prevPage, nextPage }
}

const moveItem          = ({ itemIdx, from, to, data })     => {
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

const moveItemToLeft    = ({ item, data })                  => {
    const { itemIdx, currentPage, prevPage } = getItemInfo({ item, data })
    return moveItem({
        itemIdx,
        from:   currentPage,
        to:     prevPage,
        data
    })
}

const moveItemToRight   = ({ item, data })                  => {
    const { itemIdx, currentPage, nextPage } = getItemInfo({ item, data })
    return moveItem({
        itemIdx,
        from:   currentPage,
        to:     nextPage,
        data
    })
}

const moveItemsToLeft     = ({ items, data })               => items.reduce((data, item) => moveItemToLeft({ item, data }), data)

const moveItemsToRight    = ({ items, data })               => items.reduce((data, item) => moveItemToRight({ item, data }), data)

const reducer = (state = initialState, action) => {
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
        case ActionTypes.itemsMovedToLeft:
            return {
                ...state,
                data: moveItemsToLeft({ items: action.payload, data: state.data })
            }
        case ActionTypes.itemsMovedToRight:
            return {
                ...state,
                data: moveItemsToRight({ items: action.payload, data: state.data })
            }
        default:
            return state
    }
}

export default reducer