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

const moveItemToLeft = item => {
    return {
        type: 'MOVE_ITEM_TO_LEFT',
        payload: item
    }
}

const moveItemToRight = item => {
    return {
        type: 'MOVE_ITEM_TO_RIGHT',
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
    moveItemToLeft,
    moveItemToRight
}