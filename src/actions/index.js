const pagesRequested = () => {
    return {
        type: 'FETCH_PAGES_REQUEST'
    }
}

const pagesLoaded = newPages => {
    return {
        type: 'FETCH_PAGES_SUCCESS',
        payload: newPages
    }
}

const pagesError = error => {
    return {
        type: 'FETCH_PAGES_FAILURE',
        payload: error
    }
}

const fetchPages = (appService, dispatch) => () => {
    dispatch(pagesRequested())
    appService.getPages()
      .then(data=>dispatch(pagesLoaded(data)))
      .catch(error=>dispatch(pagesError(error)))
}

export {
    fetchPages
}