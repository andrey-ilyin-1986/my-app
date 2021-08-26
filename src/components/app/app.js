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
         itemMovedToLeft,
         itemMovedToRight }               from '../../actions'


class App extends Component {

  onLeftButtonClick       = item          => !this.isVisibleLeftButton(item)
                                                ? false
                                                : () => this.props.itemMovedToLeft(item)

  onRightButtonClick      = item          => !this.isVisibleRightButton(item)
                                                ? false
                                                : () => this.props.itemMovedToRight(item)

  onSaveButtonClick       = data          => () => this.props.saveData(data)

  isFirstItem             = item          => this.getParentIdx(item, this.props.data) === 0

  isLastItem              = item          => this.getParentIdx(item, this.props.data) === this.props.data.length - 1

  getFirstKey             = data          => data.length > 0
                                              ? this.getTabKey(data[0])
                                              : ''

  isKeyExist              = (data, key)   => data.filter(item=>this.getTabKey(item) === key).length > 0

  isVisibleLeftButton     = item          => this.isLastItem(item)
                                              || (!this.isFirstItem(item)
                                                  && !this.isLastItem(item))

  isVisibleRightButton    = item          => this.isFirstItem(item)
                                              || (!this.isFirstItem(item)
                                                  && !this.isLastItem(item))

  getTabKey               = item          => item.name.toString().toLowerCase()

  getPageName             = item          => `${item.name.toLowerCase()} page`

  getItemName             = (idx, item)   => `${idx+1}. ${item.name}`

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
      onLeftButtonClick:          this.onLeftButtonClick,
      onRightButtonClick:         this.onRightButtonClick,
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

const mapStateToProps   = state => state

const mapDispatchToProps = (dispatch, { appService }) => {
  return {
    fetchData: fetchData(appService, dispatch),
    saveData: saveData(appService, dispatch),
    saveItem: saveItem(appService, dispatch),
    itemMovedToLeft: item => dispatch(itemMovedToLeft(item)),
    itemMovedToRight: item => dispatch(itemMovedToRight(item))
  }
}

export default compose(
  withAppService,
  connect(mapStateToProps, mapDispatchToProps)
)(App)