import                  './record.css'
import React            from 'react'
import { withAppProps } from '../hoc-helpers'

const Record = ({item, onLeftButtonClick, onRightButtonClick, onCheckBoxClick, getName, className, selected, indeterminate}) =>
  <div className={className}>
      <div className="row">
          <div className="col-6">
            <div className="form-check">
              <input
                className   ="form-check-input"
                type        ="checkbox"
                ref         ={input => input ? input.indeterminate = indeterminate : null}
                onChange    ={onCheckBoxClick(item)}
                checked     ={selected}
              />
              <label className="form-check-label">
                {getName(item)}
              </label>
            </div>
          </div>
          <div className="col-6 d-grid gap-2 d-md-flex justify-content-md-end">
              {
                onLeftButtonClick(item)
                    ? <button   type        ="button"
                                className   ="btn btn-primary btn-sm"
                                onClick     ={onLeftButtonClick(item)}
                      >&lt;--</button>
                    : null
              }
              {
                onRightButtonClick(item)
                    ? <button   type        ="button"
                                className   ="btn btn-primary btn-sm"
                                onClick     ={onRightButtonClick(item)}
                      >--&gt;</button>
                    : null
              }
          </div>
      </div>
  </div>

export default withAppProps(Record)