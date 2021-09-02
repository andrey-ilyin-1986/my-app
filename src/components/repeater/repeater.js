import './repeater.css'
import React from 'react'

const Repeater = ({ data, children, className }) =>
  <div className={className}>
      { Object.entries(data).map(([key, item], idx) => React.cloneElement(children({item, idx, key}), { key: idx } )) }
  </div>

export default Repeater