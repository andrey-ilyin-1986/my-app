const fetchDataRequest = ()     => {
    return {
        type: 'FETCH_DATA_REQUEST'
    }
}

const fetchDataSuccess = data   => {
    return {
        type: 'FETCH_DATA_SUCCESS',
        payload: data
    }
}

const fetchDataError = error    => {
    return {
        type: 'FETCH_DATA_ERROR',
        payload: error
    }
}

const saveDataRequest = ()      => {
    return {
        type: 'SAVE_DATA_REQUEST'
    }
}

const saveDataSuccess = data    => {
    return {
        type: 'SAVE_DATA_SUCCESS',
        payload: data
    }
}

const saveDataError = error     => {
    return {
        type: 'SAVE_DATA_ERROR',
        payload: error
    }
}

const itemsMovedToLeft = items  => {
    return {
        type: 'ITEMS_MOVED_TO_LEFT',
        payload: items
    }
}

const itemsMovedToRight = items => {
    return {
        type: 'ITEMS_MOVED_TO_RIGHT',
        payload: items
    }
}

const fetchData = (appService, dispatch)    => ()       => {
    dispatch(fetchDataRequest())
    appService.getData()
              .then     (response   => response.json())
              .then     (data       => dispatch(fetchDataSuccess(data)))
              .catch    (error      => dispatch(fetchDataError(error)))
}

const saveData = (appService, dispatch)     => data     => {
    dispatch(saveDataRequest())
    appService.saveData(data)
              .then     (response   => response.text())
              .then     (data       => dispatch(saveDataSuccess(data)))
              .catch    (error      => dispatch(saveDataError(error)))
}

export {
    fetchData,
    saveData,
    itemsMovedToLeft,
    itemsMovedToRight
}