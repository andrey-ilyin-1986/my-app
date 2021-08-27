const fetchDataRequest = () => {
    return {
        type: 'FETCH_DATA_REQUEST'
    }
}

const fetchDataSuccess = data => {
    return {
        type: 'FETCH_DATA_SUCCESS',
        payload: data
    }
}

const fetchDataError = error => {
    return {
        type: 'FETCH_DATA_ERROR',
        payload: error
    }
}

const saveDataRequest = () => {
    return {
        type: 'SAVE_DATA_REQUEST'
    }
}

const saveDataSuccess = data => {
    return {
        type: 'SAVE_DATA_SUCCESS',
        payload: data
    }
}

const saveDataError = error => {
    return {
        type: 'SAVE_DATA_ERROR',
        payload: error
    }
}

const itemMovedToLeft = item => {
    return {
        type: 'ITEM_MOVED_TO_LEFT',
        payload: item
    }
}

const itemMovedToRight = item => {
    return {
        type: 'ITEM_MOVED_TO_RIGHT',
        payload: item
    }
}

const itemClicked = item => {
    return {
        type: 'ITEM_CLICKED',
        payload: item
    }
}

const pageClicked = page => {
    return {
        type: 'PAGE_CLICKED',
        payload: page
    }
}

const fetchData = (appService, dispatch) => () => {
    dispatch(fetchDataRequest())
    appService.getData()
        .then(response=>response.json())
        .then(data=>dispatch(fetchDataSuccess(data)))
        .catch(error=>dispatch(fetchDataError(error)))
}

const saveData = (appService, dispatch) => (data) => {
    dispatch(saveDataRequest())
    Promise.all(data.map(item=>appService.saveItem(item)))
        .then(data=>dispatch(saveDataSuccess(data)))
        .catch(error=>dispatch(saveDataError(error)))
}

const saveItem = (appService, dispatch) => (item) => {
    dispatch(saveDataRequest())
    appService.saveItem(item)
        .then(response=>response.text())
        .then(data=>dispatch(saveDataSuccess(data)))
        .catch(error=>dispatch(saveDataError(error)))
}

export {
    fetchData,
    saveData,
    saveItem,
    itemClicked,
    pageClicked,
    itemMovedToLeft,
    itemMovedToRight
}