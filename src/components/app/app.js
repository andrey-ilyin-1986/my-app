import './app.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { AppProvider } from '../app-context'
import Content from '../content'

export default class App extends Component {

  getItemInfo = (item, data) => {
    const parent = data.filter(parent=>parent.data.findIndex(child=>child.id === item.id) > -1)[0]
    const parentIdx = data.findIndex(el=>el.id === parent.id)
    const childIdx = parent.data.findIndex(child=>child.id === item.id)
    const prevParent = data[parentIdx - 1]
    const nextParent = data[parentIdx + 1]
    return { childIdx, parentIdx, parent, prevParent, nextParent }
  }

  onLeftButtonClick = (item) => () => {
    this.setState(({data})=>{
      const { childIdx, parentIdx, parent, prevParent } = this.getItemInfo(item, data)
      const newParent = {...parent, data:[...parent.data.slice(0, childIdx), ...parent.data.slice(childIdx + 1)]}
      const newPrevParent = {...prevParent, data:[...prevParent.data, {...parent.data[childIdx]}]}
      return { data: [...data.slice(0, parentIdx - 1), newPrevParent, newParent, ...data.slice(parentIdx + 1)]}
    })
  }

  onRightButtonClick = (item) => () => {
    this.setState(({data})=>{
      const { childIdx, parentIdx, parent, nextParent } = this.getItemInfo(item, data)
      const newParent = {...parent, data:[...parent.data.slice(0, childIdx), ...parent.data.slice(childIdx + 1)]}
      const newNextParent = {...nextParent, data:[...nextParent.data, {...parent.data[childIdx]}]}
      return { data: [...data.slice(0, parentIdx), newParent, newNextParent, ...data.slice(parentIdx + 2)]}
    })
  }

  isFirstItem = (item) => {
    const {data} = this.state
    const { parentIdx } = this.getItemInfo(item, data)
    return parentIdx === 0
  }

  isLastItem = (item) => {
    const {data} = this.state
    const { parentIdx } = this.getItemInfo(item, data)
    return parentIdx === data.length - 1
  }

  getFirstKey = (data) => data.length > 0 ? this.getTabKey(data[0]) : ''

  isKeyExist = (data, key) => data.filter(item=>this.getTabKey(item) === key).length > 0

  isVisibleLeftButton = (item) => this.isLastItem(item) || (!this.isFirstItem(item) && !this.isLastItem(item))

  isVisibleRightButton = (item) => this.isFirstItem(item) || (!this.isFirstItem(item) && !this.isLastItem(item))

  getTabKey = (item) => item.name.toString().toLowerCase()

  getPageName = (item) => `${item.name.toLowerCase()} page`

  getItemName = (idx, item) => `${idx+1}. ${item.name}`


  componentDidMount() {
    const { appService, pagesLoaded, pagesRequested } = this.props
    pagesRequested(); //???
    appService.getPages().then(data=>pagesLoaded(data))
  }

  render() {
    this.state = { data: this.props.pages } //???

    const { data } = this.state

    ////////////////////////???????
    const { loading } = this.props
    if(loading) return <h1>Loading...</h1>
    /////////////////////////??????
    
    const appPublicProps = {
      onLeftButtonClick:          this.onLeftButtonClick,
      onRightButtonClick:         this.onRightButtonClick,
      isVisibleLeftButton:        this.isVisibleLeftButton,
      isVisibleRightButton:       this.isVisibleRightButton,
      getTabKey:                  this.getTabKey,
      getPageName:                this.getPageName,
      getItemName:                this.getItemName,
    }

    return <AppProvider value={appPublicProps}>
            <Router>
              <Route path="/:tabKey?" render={({ match: {params : { tabKey }} })=>
                <Content data={data} tabKey={this.isKeyExist(data, tabKey) ? tabKey : this.getFirstKey(data)}/>
              }></Route>
            </Router>
          </AppProvider>

  }
}