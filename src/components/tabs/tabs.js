import                    './tabs.css'
import React              from 'react'
import { Link }           from 'react-router-dom'
import Repeater           from '../repeater'
import { withAppProps }   from '../hoc-helpers'

const Tabs = ({data, activeTab}) =>
  <Repeater data={data} className="nav nav-tabs">{ ({key}) =>
      <div className="nav-item">
          <Link className ={`nav-link ${key === activeTab ? "active" : ""}`}
                to        ={`/${key}`}
          >
            {key}
          </Link>
      </div>
  }</Repeater>

export default withAppProps(Tabs)