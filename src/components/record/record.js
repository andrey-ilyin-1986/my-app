import                  './record.css'
import React            from 'react'
import PropTypes        from 'prop-types'
import { withAppProps } from '../hoc-helpers'

const defaultClick = () => {}

const Record = ({ item, onLeftButtonClick, onRightButtonClick, onCheckBoxClick, getName, className, selected, indeterminate }) =>
  <div className={ className }>
      <div className="row">
          <div className="col-6">
            <div className="form-check">
              <input
                className   ="form-check-input"
                type        ="checkbox"
                ref         ={ input => input ? input.indeterminate = indeterminate : null }
                onChange    ={ onCheckBoxClick(item) }
                checked     ={ selected }
              />
              <label className="form-check-label">
                { getName(item) }
              </label>
            </div>
          </div>
          <div className="col-6 d-grid gap-2 d-md-flex justify-content-md-end">
              {
                onLeftButtonClick !== defaultClick
                    ? <button   type        ="button"
                                className   ="btn btn-primary btn-sm"
                                onClick     ={ onLeftButtonClick }
                      >&lt;--</button>
                    : null
              }
              {
                onRightButtonClick !== defaultClick
                    ? <button   type        ="button"
                                className   ="btn btn-primary btn-sm"
                                onClick     ={ onRightButtonClick }
                      >--&gt;</button>
                    : null
              }
          </div>
      </div>
  </div>

Record.defaultProps = {
  onLeftButtonClick:    defaultClick,
  onRightButtonClick:   defaultClick,
  indeterminate:        false
}

Record.propTypes = {
  item:                 PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]).isRequired,
  onLeftButtonClick:    PropTypes.func,
  onRightButtonClick:   PropTypes.func,
  onCheckBoxClick:      PropTypes.func.isRequired,
  getName:              PropTypes.func.isRequired,
  className:            PropTypes.string.isRequired,
  selected:             PropTypes.bool.isRequired,
  indeterminate:        PropTypes.bool
}

export default withAppProps(Record)