import                                    './app.css'
import   React, { Component }             from 'react'
import { BrowserRouter, Route}            from 'react-router-dom'
import { AppProvider }                    from '../app-context'
import   Content                          from '../content'
import { withAppService }                 from '../hoc-helpers'
import { fetchData,
         moveItemToLeft,
         moveItemToRight }                from '../../actions'
import { compose }                        from '../../utils'
import { connect }                        from 'react-redux'

class App extends Component {

  getParentIdx = (item, data) => {
    const parent = data.filter(parent=>parent.data.findIndex(child=>child.id === item.id) > -1)[0]
    return data.findIndex(el=>el.id === parent.id)
  }

  onLeftButtonClick = item => !this.isVisibleLeftButton(item) ? false : () => this.props.moveItemToLeft(item)

  onRightButtonClick = item => !this.isVisibleRightButton(item) ? false : () => this.props.moveItemToRight(item)

  isFirstItem = item => this.getParentIdx(item, this.props.data) === 0

  isLastItem = item =>  this.getParentIdx(item, this.props.data) === this.props.data.length - 1

  getFirstKey = data => data.length > 0 ? this.getTabKey(data[0]) : ''

  isKeyExist = (data, key) => data.filter(item=>this.getTabKey(item) === key).length > 0

  isVisibleLeftButton = item => this.isLastItem(item) || (!this.isFirstItem(item) && !this.isLastItem(item))

  isVisibleRightButton = item => this.isFirstItem(item) || (!this.isFirstItem(item) && !this.isLastItem(item))

  getTabKey = item => item.name.toString().toLowerCase()

  getPageName = item => `${item.name.toLowerCase()} page`

  getItemName = (idx, item) => `${idx+1}. ${item.name}`

  componentDidMount() {
    this.props.fetchData()
  }

  render() {
    const { loading, error, data } = this.props
    if(loading) return <h1>Loading...</h1>
    if(error)   return <h1>{error.message}</h1>

    const appPublicProps = {
      onLeftButtonClick:          this.onLeftButtonClick,
      onRightButtonClick:         this.onRightButtonClick,
      getTabKey:                  this.getTabKey,
      getPageName:                this.getPageName,
      getItemName:                this.getItemName,
    }

    return <AppProvider value={appPublicProps}>
            <BrowserRouter>
              <Route path="/:tabKey?" render={({ match: {params : { tabKey }} })=>
                <Content data={data} tabKey={this.isKeyExist(data, tabKey) ? tabKey : this.getFirstKey(data)}/>
              }></Route>
            </BrowserRouter>
          </AppProvider>

  }
}

const mapStateToProps = state => state

const mapDispatchToProps = (dispatch, { appService }) => {
  return {
    fetchData: fetchData(appService, dispatch),
    moveItemToLeft: item => dispatch(moveItemToLeft(item)),
    moveItemToRight: item => dispatch(moveItemToRight(item))
  }
}

export default compose(
  withAppService,
  connect(mapStateToProps, mapDispatchToProps)
)(App);