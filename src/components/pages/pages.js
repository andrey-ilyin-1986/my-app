import                  './pages.css'
import React            from 'react'
import Record           from '../record'
import Repeater         from '../repeater'
import { withAppProps } from '../hoc-helpers'

const Pages = ({data, getPageName}) =>
  <Repeater data={data} className="row">{ item =>
    <div className="col">
      <b>{getPageName(item)}</b>
      <Repeater data={item.data} className="item-list list-group">{ (item, idx) =>
        <Record idx={idx} item={item}/>
      }</Repeater>
    </div>
  }</Repeater>

export default withAppProps(Pages)