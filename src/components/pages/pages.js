import                  './pages.css'
import React            from 'react'
import Record           from '../record'
import Repeater         from '../repeater'
import { withAppProps } from '../hoc-helpers'

const Pages = ({
    data, getItemName, getPageName,
    onLeftButtonClickItem, onRightButtonClickItem, onCheckBoxClickItem,
    onLeftButtonClickPage, onRightButtonClickPage, onCheckBoxClickPage
  }) =>
  <Repeater data={data} className="row">{ page =>
    <div className="col">
      <Record
        item={page}
        className="list-group-item bg-info"
        getName={getPageName()}
        onLeftButtonClick={onLeftButtonClickPage}
        onRightButtonClick={onRightButtonClickPage}
        onCheckBoxClick={onCheckBoxClickPage}
      />
      <Repeater data={page.data} className="item-list list-group">{ (item, idx) =>
        <Record
          item={item}
          className="list-group-item"
          getName={getItemName(idx)}
          onLeftButtonClick={onLeftButtonClickItem}
          onRightButtonClick={onRightButtonClickItem}
          onCheckBoxClick={onCheckBoxClickItem}
        />
      }</Repeater>
    </div>
  }</Repeater>

export default withAppProps(Pages)