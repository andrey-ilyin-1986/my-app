import                    './content.css'
import React              from 'react'
import { withAppProps }   from '../hoc-helpers'
import Pages              from '../pages'
import Tabs               from '../tabs'

const Content = ({data, tabKey, getTabKey, onSaveButtonClick}) =>
  <div className="container">
    <h1>Welcome to my app</h1>
    <Pages data={data}/>
    <Tabs data={data} tabKey={tabKey}/>
    <Pages data={data.filter((item)=>getTabKey(item) === tabKey)} />
    <div className="row">
      <div className="col-12 d-grid gap-2 d-md-flex justify-content-md-center">
        <button type="button" className="btn btn-primary btn-lg" onClick={onSaveButtonClick(data)}>Save</button>
      </div>
    </div>
  </div>

export default withAppProps(Content)