const dataRequested = () => {
    return {
        type: 'FETCH_DATA_REQUEST'
    }
}

const dataLoaded = data => {
    return {
        type: 'FETCH_DATA_SUCCESS',
        payload: data
    }
}

const dataError = error => {
    return {
        type: 'FETCH_DATA_FAILURE',
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

const fetchData = (appService, dispatch) => () => {
    dispatch(dataRequested())
    appService.getData()
      .then(data=>dispatch(dataLoaded(data)))
      .catch(error=>dispatch(dataError(error)))
}

export {
    fetchData,
    itemMovedToLeft,
    itemMovedToRight
}