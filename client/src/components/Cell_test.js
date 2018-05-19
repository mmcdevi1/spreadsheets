import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import actions from '../actions/spreadsheet';
import _ from 'lodash';

class Cell extends React.Component {
  // shouldComponentUpdate (nextProps, nextState) {
  //   // const { value, selected, editable } = this.state;
  //   const { row, col } = this.props;

  //   const thisCell = [ row, col ]

  //   // if (nextState.value    !== value)    { return true }
  //   // if (nextState.selected !== selected) { return true }
  //   // if (nextState.editable !== editable) { return true }

    // if ( _.isEqual( thisCell, nextProps.currentCell ) ) {
    //   console.log('[NEXTPROPS.CURRENTCELL], ', thisCell, nextProps.currentCell)
    //   return true 
    // }

    // if ( _.isEqual( thisCell, this.props.currentCell ) ) {
    //   console.log('[PROPS.CURRENTCELL], ', thisCell, this.props.currentCell)
    //   return true 
    // }

  //   // if ( _.isEqual( thisCell, this.props.prevCell ) ) {
  //   //   console.log('This is the cell, ', thisCell)
  //   //   return true 
  //   // }

  //   return false
  // }

  render () {
    const { row, col, onSelect } = this.props;

    return (
      <td 
        id={`${row}-${col}`}
        className={this.props.defineClasses(row, col)}
        data-row={row} 
        data-column={col} 
        onClick={onSelect} 
        onDoubleClick={this.props.toggleEditable}
        onBlur={this.toggleEditable}
        onKeyPress={(e) => this.onEnterKeyPress(e, row, col)}
      >
        {this.props.children}
      </td>
    )
  }
}


export default Cell































