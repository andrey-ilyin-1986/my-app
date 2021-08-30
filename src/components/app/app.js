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
         saveItem,
         itemsMovedToLeft,
         itemsMovedToRight }               from '../../actions'


class App extends Component {

  onItemLeftButtonClick   = item          => !this.isVisibleLeftButtonItem(item)
                                                ? false
                                                : () => this.props.itemsMovedToLeft([item])

  onItemRightButtonClick  = item          => !this.isVisibleRightButtonItem(item)
                                                ? false
                                                : () => this.props.itemsMovedToRight([item])

  onPageLeftButtonClick   = ids => page   => !this.isVisibleLeftButtonPage(page)
                                                ? false
                                                : () => this.props.itemsMovedToLeft(page.data.filter(item => ids.filter(id=>id===item.id).length > 0))

  onPageRightButtonClick  = ids => page   => !this.isVisibleRightButtonPage(page)
                                                ? false
                                                : () => this.props.itemsMovedToRight(page.data.filter(item => ids.filter(id=>id===item.id).length > 0))

  onSaveButtonClick       = data          => () => this.props.saveData(data)

  isFirstItem             = item          => this.getParentIdx(item, this.props.data) === 0

  isLastItem              = item          => this.getParentIdx(item, this.props.data) === this.props.data.length - 1

  isFirstPage             = page          => this.props.data.findIndex(el=>el.id === page.id) === 0

  isLastPage              = page          => this.props.data.findIndex(el=>el.id === page.id) === this.props.data.length - 1

  getFirstKey             = data          => data.length > 0
                                              ? this.getTabKey(data[0])
                                              : ''

  isKeyExist              = (data, key)   => data.filter(item=>this.getTabKey(item) === key).length > 0

  isVisibleLeftButtonItem = item          => this.isLastItem(item)
                                              || (!this.isFirstItem(item)
                                                    && !this.isLastItem(item))

  isVisibleRightButtonItem = item          => this.isFirstItem(item)
                                              || (!this.isFirstItem(item)
                                                    && !this.isLastItem(item))

  isVisibleLeftButtonPage = page          => this.isLastPage(page)
                                              || (!this.isFirstPage(page)
                                                    && !this.isLastPage(page))

  isVisibleRightButtonPage = page          => this.isFirstPage(page)
                                              || (!this.isFirstPage(page)
                                                    && !this.isLastPage(page))

  getTabKey               = item          => item.name.toString().toLowerCase()

  getPageName             = ()  => page   => <b>{`${page.name.toLowerCase()} page`}</b>

  getItemName             = idx => item   => `${idx+1}. ${item.name}`

  getParentIdx = (item, data) => {
    const parent = data.filter(parent=>parent.data.findIndex(child=>child.id === item.id) > -1)[0]
    return data.findIndex(el=>el.id === parent.id)
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
      onSaveButtonClick:          this.onSaveButtonClick,
      getTabKey:                  this.getTabKey,
      getPageName:                this.getPageName,
      getItemName:                this.getItemName,
    }

    return <AppProvider value={appPublicProps}>
            <BrowserRouter>
              <Route path="/:tabKey?" render={({ match: {params : { tabKey }} })=>
                this.isKeyExist(data, tabKey)
                  ? <Content data={data} tabKey={tabKey}/>
                  : <Redirect to={`/${this.getFirstKey(data)}`}/>
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
    saveItem:             saveItem(appService, dispatch),
    itemsMovedToLeft:     items => dispatch(itemsMovedToLeft(items)),
    itemsMovedToRight:    items => dispatch(itemsMovedToRight(items))
  }
}

export default compose(
  withAppService,
  connect(mapStateToProps, mapDispatchToProps)
)(App)