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

  onPageCheckBoxClick     = ({data})          => () => {
    this.setState(({selected}) => {
      return {
        selected:     !selected,
        selectedIds:  selected ? [] : data.map(item=>item.id)
      }
    })
  }

  onItemCheckBoxClick     = ({data}) => item  => () => {
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
    const currentItems = this.props.data.data
    const prevItems = prevProps.data.data
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
      data, getItemName, getPageName,
      onItemLeftButtonClick, onItemRightButtonClick,
      onPageLeftButtonClick, onPageRightButtonClick,
    } = this.props

    const { selected, selectedIds } = this.state

    return <Fragment>
            <Record
              item                  ={data}
              className             ="list-group-item bg-info"
              getName               ={getPageName()}
              onLeftButtonClick     ={onPageLeftButtonClick(selectedIds)}
              onRightButtonClick    ={onPageRightButtonClick(selectedIds)}
              onCheckBoxClick       ={this.onPageCheckBoxClick}
              selected              ={selected}
              indeterminate         ={selectedIds.length < data.data.length && selectedIds.length > 0}
            />
            <Repeater data={data.data} className="item-list list-group">{ (item, idx) =>
              <Record
                item                ={item}
                className           ="list-group-item"
                getName             ={getItemName(idx)}
                onLeftButtonClick   ={onItemLeftButtonClick}
                onRightButtonClick  ={onItemRightButtonClick}
                onCheckBoxClick     ={this.onItemCheckBoxClick(data)}
                selected            ={selectedIds.filter(id => id === item.id).length > 0}
                indeterminate       ={false}
              />
            }</Repeater>
          </Fragment>
  }
}

export default withAppProps(Page)