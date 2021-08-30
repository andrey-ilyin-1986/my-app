import                  './pages.css'
import React            from 'react'
import Repeater         from '../repeater'
import { withAppProps } from '../hoc-helpers'
import Page             from '../page'

const Pages = ({data}) =>
  <Repeater data={data} className="row">{ item =>
    <div className="col">
      <Page data={item} />
    </div>
  }</Repeater>

export default withAppProps(Pages)