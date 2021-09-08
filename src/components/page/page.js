import                      './page.css'
import React, {
                Component,
                Fragment
              }             from 'react'
import Record               from '../record'
import Repeater             from '../repeater'
import { withAppProps }     from '../hoc-helpers'

class Page extends Component {

  state = {
    selected: false,
    selectedIds: []
  }

  onPageCheckBoxClick     = data => ()    => () => {
    this.setState(({selected}) => {
      return {
        selected:     !selected,
        selectedIds:  selected ? [] : data.map(item=>item.id)
      }
    })
  }

  onItemCheckBoxClick     = data => item  => () => {
    this.setState(({selectedIds}) => {
      var newSelectedIds = selectedIds.filter(id => id !== item.id);
      if(newSelectedIds.length === selectedIds.length) newSelectedIds.push(item.id)
      return {
        selected:     data.length === newSelectedIds.length,
        selectedIds:  newSelectedIds
      }
    })
  }

  componentDidUpdate(prevProps) {
    const currentItems = this.props.data
    const prevItems = prevProps.data
    const { selectedIds } = this.state
    if(currentItems.length !== prevItems.length) {
      var newSelectedIds = currentItems.filter(item=>selectedIds.includes(item.id)).map(item=>item.id)
      this.setState({
        selected:     currentItems.length > 0 && currentItems.length === newSelectedIds.length,
        selectedIds:  newSelectedIds
      })
    }
  }

  render() {
    const {
      data, pageKey, getItemName, getPageName,
      onItemLeftButtonClick, onItemRightButtonClick,
      onPageLeftButtonClick, onPageRightButtonClick,
    } = this.props

    const { selected, selectedIds } = this.state

    const pageRecordProps = ()              => {
      const props = {
        item:                 pageKey,
        className:            "list-group-item bg-info",
        getName:              getPageName(),
        onCheckBoxClick:      this.onPageCheckBoxClick(data),
        selected:             selected,
        indeterminate:        selectedIds.length < data.length && selectedIds.length > 0
      }
      if(onPageLeftButtonClick  (pageKey))  props.onLeftButtonClick   = onPageLeftButtonClick   (pageKey)(selectedIds)
      if(onPageRightButtonClick (pageKey))  props.onRightButtonClick  = onPageRightButtonClick  (pageKey)(selectedIds)
      return props
    }

    const itemRecordProps = ({ item, idx })  => {
      const props = {
        item:               item,
        className:          "list-group-item",
        getName:            getItemName(idx),
        onLeftButtonClick:  onItemLeftButtonClick,
        onRightButtonClick: onItemRightButtonClick,
        onCheckBoxClick:    this.onItemCheckBoxClick(data),
        selected:           selectedIds.filter(id => id === item.id).length > 0
      }
      if(onItemLeftButtonClick  (item))  props.onLeftButtonClick    = onItemLeftButtonClick   (item)
      if(onItemRightButtonClick (item))  props.onRightButtonClick   = onItemRightButtonClick  (item)
      return props
    }

    return <Fragment>
            <Record     { ...pageRecordProps() }/>
            <Repeater   data={ data }
                        className="item-list list-group"
            >{ ({item, idx}) =>
              <Record   { ...itemRecordProps({ item, idx }) }/>
            }</Repeater>
          </Fragment>
  }
}

export default withAppProps(Page)