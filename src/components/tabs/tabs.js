import                    './tabs.css'
import React              from 'react'
import { Link }           from 'react-router-dom'
import Repeater           from '../repeater'
import { withAppProps }   from '../hoc-helpers'

const Tabs = ({data, tabKey, getTabKey}) =>
  <Repeater data={data} className="nav nav-tabs">{ item =>
      <div className="nav-item">
          <Link className={`nav-link ${getTabKey(item) === tabKey ? "active" : ""}`}
                to={`/${getTabKey(item)}`}
          >
            {item.name}
          </Link>
      </div>
  }</Repeater>

export default withAppProps(Tabs)