import   ActionTypes    from './types'

const fetchDataRequest = ()     => {
    return {
        type:       ActionTypes.fetchDataRequest
    }
}

const fetchDataSuccess = data   => {
    return {
        type:       ActionTypes.fetchDataSuccess,
        payload:    data
    }
}

const fetchDataError = error    => {
    return {
        type:       ActionTypes.fetchDataError,
        payload:    error
    }
}

const saveDataRequest = ()      => {
    return {
        type:       ActionTypes.saveDataRequest
    }
}

const saveDataSuccess = data    => {
    return {
        type:       ActionTypes.saveDataSuccess,
        payload:    data
    }
}

const saveDataError = error     => {
    return {
        type:       ActionTypes.saveDataError,
        payload:    error
    }
}

const itemsMoved    = items     => {
    return {
        type:       ActionTypes.itemsMoved,
        payload:    items
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
    itemsMoved
}