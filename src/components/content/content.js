import './content.css'
import React from 'react'
import { withAppProps } from '../hoc-helpers'
import Pages from '../pages'
import Tabs from '../tabs'

const Content = withAppProps(({data, tabKey, getTabKey}) =>
  <div className="container">
    <h1>Welcome to my app</h1>
    <Pages data={data}/>
    <Tabs data={data} tabKey={tabKey}/>
    <Pages data={data.filter((item)=>getTabKey(item) === tabKey)} />
  </div>
)

export default Content