import './app.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { AppProvider } from '../app-context'
import Content from '../content'

export default class App extends Component {

  maxId = 0

  state = {
    data: [
      this.createItem('Left', [
        this.createItem('Left 1'),
        this.createItem('Left 2'),
        this.createItem('Left 3')
      ]),
      this.createItem('Middle', [
        this.createItem('Middle 1'),
        this.createItem('Middle 2'),
        this.createItem('Middle 3')
      ]),
      this.createItem('Right', [
        this.createItem('Right 1'),
        this.createItem('Right 2'),
        this.createItem('Right 3')
      ]),
    ]
  }

  createItem(name, data = [])
  {
    return {id: this.maxId++, name, data}
  }

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

  isVisibleLeftButton = (item) => this.isLastItem(item) || (!this.isFirstItem(item) && !this.isLastItem(item))

  isVisibleRightButton = (item) => this.isFirstItem(item) || (!this.isFirstItem(item) && !this.isLastItem(item))

  getTabKey = (item) => item.name.toString().toLowerCase()

  getPageName = (item) => `${item.name.toLowerCase()} page`

  getItemName = (idx, item) => `${idx+1}. ${item.name}`

  render() {
    const { data } = this.state

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
                <Content data={data} tabKey={tabKey}/>
              }></Route>
            </Router>
          </AppProvider>

  }
}