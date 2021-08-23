const pagesLoaded = (newPages) => {
    return {
        type: 'PAGES_LOADED',
        payload: newPages
    }
}

const pagesRequested = () => {
    return {
        type: 'PAGES_REQUESTED'
    }
}

export {
    pagesLoaded,
    pagesRequested
}