import './repeater.css'
import React from 'react'

const Repeater = ({ data, children, className }) =>
  <div className={className}>
      { data.map((item, idx) => React.cloneElement(children(item, idx), { key:item.id } )) }
  </div>

export default Repeater