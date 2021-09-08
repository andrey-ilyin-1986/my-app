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
         itemsMovedToLeft,
         itemsMovedToRight }               from '../../actions'


class App extends Component {

  onItemLeftButtonClick   = item                => () => this.props.itemsMovedToLeft([item])

  onItemRightButtonClick  = item                => () => this.props.itemsMovedToRight([item])

  onPageLeftButtonClick   = page  =>  ids       => () => this.props.itemsMovedToLeft(this.props.data[page].filter(item => ids.includes(item.id)))

  onPageRightButtonClick  = page  =>  ids       => () => this.props.itemsMovedToRight(this.props.data[page].filter(item => ids.includes(item.id)))

  onSaveButtonClick       = data                => () => this.props.saveData(data)

  isLeftItem              = item                => this.getPageIdx({ item, data: this.props.data }) === 0

  isRightItem             = item                => this.getPageIdx({ item, data: this.props.data }) === this.getTabKeys(this.props.data).length - 1

  isLeftPage              = page                => this.getTabKeys(this.props.data).findIndex(el=>el === page) === 0

  isRightPage             = page                => this.getTabKeys(this.props.data).findIndex(el=>el === page) === this.getTabKeys(this.props.data).length - 1

  getFirstKey             = data                => {
                                                  const keys = this.getTabKeys(data)
                                                  return keys.length > 0 ? keys[0] : ''
                                                }

  isKeyExist              = ({ data, tabKey })  => data[tabKey] != null

  isVisibleItemLeftButton = item                => this.isRightItem(item)
                                                    || (!this.isLeftItem(item)
                                                          && !this.isRightItem(item))

  isVisibleItemRightButton = item               => this.isLeftItem(item)
                                                    || (!this.isLeftItem(item)
                                                          && !this.isRightItem(item))

  isVisiblePageLeftButton = page                => this.isRightPage(page)
                                                    || (!this.isLeftPage(page)
                                                          && !this.isRightPage(page))

  isVisiblePageRightButton = page               => this.isLeftPage(page)
                                                    || (!this.isLeftPage(page)
                                                          && !this.isRightPage(page))

  getTabKeys               = data               => Object.keys(data)

  getPageName              = ()  => page        => <b>{ `${ page.toLowerCase() } page` }</b>

  getItemName              = idx => item        => `${ idx + 1 }. ${ item.name }`

  getPageIdx = ({ item, data })                 => {
    const parent = this.getTabKeys(data).filter(parent => data[parent].findIndex(child=>child.id === item.id) > -1)[0]
    return this.getTabKeys(data).findIndex(el=>el === parent)
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

    return <AppProvider value={ appPublicProps }>
            <BrowserRouter>
              <Route path="/:tabKey?" render={ ({ match: { params : { tabKey } } }) =>
                this.isKeyExist({ data, tabKey })
                  ? <Content data={ data } tabKey={ tabKey }/>
                  : <Redirect  to={ `/${ this.getFirstKey(data) }` }/>
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
    itemsMovedToLeft:     items => dispatch(itemsMovedToLeft(items)),
    itemsMovedToRight:    items => dispatch(itemsMovedToRight(items))
  }
}

export default compose(
  withAppService,
  connect(mapStateToProps, mapDispatchToProps)
)(App)