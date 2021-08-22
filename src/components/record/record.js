import './record.css'
import React from 'react'
import { withAppProps } from '../hoc-helpers'

const Record = withAppProps(({idx, item, onLeftButtonClick, onRightButtonClick, isVisibleLeftButton, isVisibleRightButton, getItemName}) =>
  <div className="list-group-item">
      <div className="row">
          <div className="col-6">{getItemName(idx, item)}</div>
          <div className="col-6 d-grid gap-2 d-md-flex justify-content-md-end">
              {isVisibleLeftButton(item) ? <button type="button" className="btn btn-primary btn-sm" onClick={onLeftButtonClick(item)}>&lt;--</button> : null}
              {isVisibleRightButton(item) ? <button type="button" className="btn btn-primary btn-sm" onClick={onRightButtonClick(item)}>--&gt;</button> : null}
          </div>
      </div>
  </div>
)

export default Record