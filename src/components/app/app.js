import                                    './app.css'
import   React, { Component }             from 'react'
import { BrowserRouter, Route, Redirect}  from 'react-router-dom'
import { compose }                        from 'redux'
import { connect }                        from 'react-redux'
import { AppProvider }                    from '../app-context'
import   Content                          from '../content'
import { withAppService }                 from '../hoc-helpers'
import { fetchData,
         saveData,
         itemsMoved   }                   from '../../actions'

class App extends Component {

  onItemLeftButtonClick   = item                => () =>  {
                                                    const { currentPage, prevPage } = this.getItemInfo(item)
                                                    return this.props.itemsMoved([{ id: item.id, from: currentPage, to: prevPage }])
                                                }

  onItemRightButtonClick  = item                => () => {
                                                  const { currentPage, nextPage } = this.getItemInfo(item)
                                                  return this.props.itemsMoved([{ id: item.id, from: currentPage, to: nextPage }])
                                                }

  onPageLeftButtonClick   = page  =>  ids       => () => this.props.itemsMoved(this.props.data[page].filter(item => ids.includes(item.id)).map(item => {
                                                  const { currentPage, prevPage } = this.getItemInfo(item)
                                                  return { id: item.id, from: currentPage, to: prevPage }
                                                }))

  onPageRightButtonClick  = page  =>  ids       => () => this.props.itemsMoved(this.props.data[page].filter(item => ids.includes(item.id)).map(item => {
                                                  const { currentPage, nextPage } = this.getItemInfo(item)
                                                  return { id: item.id, from: currentPage, to: nextPage }
                                                }))

  onSaveButtonClick       = data                => () => this.props.saveData(data)

  isLeftItem              = item                => this.getPageIdx(item) === 0

  isRightItem             = item                => this.getPageIdx(item) === this.getTabKeys().length - 1

  isLeftPage              = page                => this.getTabKeys().findIndex(el => el === page) === 0

  isRightPage             = page                => this.getTabKeys().findIndex(el => el === page) === this.getTabKeys().length - 1

  getFirstKey             = ()                  => {
                                                  const keys = this.getTabKeys()
                                                  return keys.length > 0 ? keys[0] : ''
                                                }

  isKeyExist              = key                 => this.props.data[key] != null

  isVisibleItemLeftButton = item                => this.isRightItem(item)
                                                    || (!this.isLeftItem(item)
                                                          && !this.isRightItem(item))

  isVisibleItemRightButton = item               => this.isLeftItem(item)
                                                    || (!this.isLeftItem(item)
                                                          && !this.isRightItem(item))

  isVisiblePageLeftButton  = page               => this.isRightPage(page)
                                                    || (!this.isLeftPage(page)
                                                          && !this.isRightPage(page))

  isVisiblePageRightButton = page               => this.isLeftPage(page)
                                                    || (!this.isLeftPage(page)
                                                          && !this.isRightPage(page))

  getTabKeys               = ()                 => Object.keys(this.props.data)

  getPageName              = ()  => page        => <b>{ `${ page.toLowerCase() } page` }</b>

  getItemName              = idx => item        => `${ idx + 1 }. ${ item.name }`

  getPageIdx               = item               => {
    const parent = this.getTabKeys().filter(parent => this.props.data[parent].findIndex(child => child.id === item.id) > -1)[0]
    return this.getTabKeys().findIndex(el => el === parent)
  }

  getItemInfo              = item              => {
    const pages            = this.getTabKeys()
    const currentPage      = pages.filter(parent => this.props.data[parent].findIndex(child => child.id === item.id) > -1)[0]
    const pageIdx          = pages.findIndex(el => el === currentPage)
    const prevPage         = pages[pageIdx - 1]
    const nextPage         = pages[pageIdx + 1]
    return { currentPage, prevPage, nextPage }
  }

  componentDidMount() {
    this.props.fetchData()
  }

  render() {
    const { loading, saving, error, data } = this.props

    if(loading) return <h1>Loading...</h1>
    if(saving)  return <h1>Saving...</h1>
    if(error)   return <h1>{error.message}</h1>

    const appPublicProps = {
      onItemLeftButtonClick:      this.onItemLeftButtonClick,
      onItemRightButtonClick:     this.onItemRightButtonClick,
      onPageLeftButtonClick:      this.onPageLeftButtonClick,
      onPageRightButtonClick:     this.onPageRightButtonClick,
      isVisibleItemLeftButton:    this.isVisibleItemLeftButton,
      isVisibleItemRightButton:   this.isVisibleItemRightButton,
      isVisiblePageLeftButton:    this.isVisiblePageLeftButton,
      isVisiblePageRightButton:   this.isVisiblePageRightButton,
      onSaveButtonClick:          this.onSaveButtonClick,
      getPageName:                this.getPageName,
      getItemName:                this.getItemName,
    }

    return  <AppProvider value={ appPublicProps }>
              <BrowserRouter>
                <Route path="/:tabKey?" render={ ({ match: { params : { tabKey } } }) =>
                  this.isKeyExist(tabKey)
                    ? <Content data={ data } tabKey={ tabKey }/>
                    : <Redirect  to={ `/${ this.getFirstKey() }` }/>
                }></Route>
              </BrowserRouter>
            </AppProvider>

  }
}

const mapStateToProps     = state => state

const mapDispatchToProps  = (dispatch, { appService }) => {
  return {
    fetchData:            fetchData(appService, dispatch),
    saveData:             saveData(appService, dispatch),
    itemsMoved:           items => dispatch(itemsMoved(items))
  }
}

export default compose(
  withAppService,
  connect(mapStateToProps, mapDispatchToProps)
)(App)