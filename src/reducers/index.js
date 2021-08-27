const initialState = {
    data: [],
    loading: true,
    saving: false,
    error: null
}

const getPageInfo       = (item, data)      => {
    const pageIdx       = data.findIndex(el=>el.id === item.id)
    const page          = data[pageIdx]
    return { pageIdx, page }
}

const getItemInfo       = (item, data)      => {
    const parent        = data.filter(parent=>parent.data.findIndex(child=>child.id === item.id) > -1)[0]
    const parentIdx     = data.findIndex(el=>el.id === parent.id)
    const childIdx      = parent.data.findIndex(child=>child.id === item.id)
    const child         = parent.data[childIdx]
    const prevParent    = data[parentIdx - 1]
    const nextParent    = data[parentIdx + 1]
    return { childIdx, parentIdx, child, parent, prevParent, nextParent }
}

const moveItemToLeft    = (item, data)      => {
    const { childIdx, parentIdx, parent, prevParent } = getItemInfo(item, data)
    const newParent = {
        ...parent,
        data:[
            ...parent.data.slice(0, childIdx),
            ...parent.data.slice(childIdx + 1)
        ]
    }
    newParent.checked = isPageChecked(newParent)
    const newPrevParent = {
        ...prevParent,
        data:[
            ...prevParent.data,
            {
                ...parent.data[childIdx]
            }
        ]
    }
    newPrevParent.checked = isPageChecked(newPrevParent)
    return [
        ...data.slice(0, parentIdx - 1),
        newPrevParent,
        newParent,
        ...data.slice(parentIdx + 1)
    ]
}

const moveItemToRight   = (item, data)      => {
    const { childIdx, parentIdx, parent, nextParent } = getItemInfo(item, data)
    const newParent = {
        ...parent,
        data:[
            ...parent.data.slice(0, childIdx),
            ...parent.data.slice(childIdx + 1)
        ]
    }
    newParent.checked = isPageChecked(newParent)
    const newNextParent = {
        ...nextParent,
        data:[
            ...nextParent.data,
            {
                ...parent.data[childIdx]
            }
        ]
    }
    newNextParent.checked = isPageChecked(newNextParent)
    return [
        ...data.slice(0, parentIdx),
        newParent,
        newNextParent,
        ...data.slice(parentIdx + 2)
    ]
}

const clickItem         = (item, data)      => {
    const { childIdx, parentIdx, child, parent } = getItemInfo(item, data)
    const newChild = {
        ...child,
        checked: !child.checked
    }
    const newParent = {
        ...parent,
        data:[
            ...parent.data.slice(0, childIdx),
            newChild,
            ...parent.data.slice(childIdx + 1)
        ]
    }
    newParent.checked = isPageChecked(newParent)
    return [
        ...data.slice(0, parentIdx),
        newParent,
        ...data.slice(parentIdx + 1)
    ]
}

const clickPage         = (item, data)      => {
    const { pageIdx, page } = getPageInfo(item, data)
    const newPage = {
        ...page,
        checked: !page.checked,
        data: page.data.map(child => {
            return {
                ...child,
                checked: !page.checked}
            }
        )
    }
    return [
        ...data.slice(0, pageIdx),
        newPage,
        ...data.slice(pageIdx + 1)
    ]
}

const isPageChecked     = page              => page.data.reduce((checked,child) => checked && child.checked, page.data.length !== 0)

const prepareData = (data) => data.map(page => {
                                return {
                                    ...page,
                                    checked: false,
                                    data: page.data.map(item => {
                                        return {
                                            ...item,
                                            checked: false
                                        }
                                    })
                                }
                            })

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
                data: prepareData(action.payload),
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
        case 'ITEM_CLICKED':
            return {
                ...state,
                data: clickItem(action.payload, state.data)
            }
        case 'PAGE_CLICKED':
            return {
                ...state,
                data: clickPage(action.payload, state.data)
            }
        default:
            return state
    }
}

export default reducer