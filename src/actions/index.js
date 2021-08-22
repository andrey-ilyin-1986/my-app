const pagesLoaded = (newPages) => {
    return {
        type: 'PAGES_LOADED',
        payload: newPages
    }
}

export {
    pagesLoaded
}