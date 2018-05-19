import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import actions from '../actions/spreadsheet';
import _ from 'lodash';
import math from 'mathjs';

import Cell from './Cell_test';

const { toggleSelected } = actions;

const notEqual = (arr, arr2) => {
  return !_.isEqual(arr, arr2)
}

class CellData extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      value: '',
      mathValue: null,
      selected: false,
      editable: false,
    }
  }

  componentDidMount () {
    const { row, col } = this.props;

    this.headerValues()

    window.addEventListener('keydown', (e) => this.clearGridOnKey(e))
    // window.addEventListener('keydown', (e) => this.forceEdit(e))
  }  

  componentWillUnmount () {
    window.removeEventListener('keydown', (e) => this.clearGridOnKey(e))
    // window.removeEventListener('keydown', (e) => this.forceEdit(e))
  }

  componentWillReceiveProps (nextProps) {
    const { selected, editable } = this.state;
    
    if ( selected && notEqual(nextProps.currentCell, this.props.currentCell) ) {
      this.setState({ selected: false })
    }
    
    // if ( editable && !_.isEqual(nextProps.currentCell, this.props.currentCell) ) {
    //   this.setState({ editable: false })
    // } 
  }

  shouldComponentUpdate (nextProps, nextState) {
    const { value, selected, editable } = this.state;
    const { row, col, prevCell } = this.props;

    const thisCell = [ row, col ]

    if (nextState.value    !== value)    { return true }
    if (nextState.selected !== selected) { return true }
    if (nextState.editable !== editable) { return true }

    if ( _.isEqual( thisCell, this.props.currentCell ) || _.isEqual( thisCell, nextProps.currentCell ) ) {
      console.log('This is the cell, ', thisCell, this.props.currentCell, nextProps.currentCell)
      return true 
    }

    // if ( _.isEqual( thisCell, this.props.prevCell ) ) {
    //   console.log('This is the cell, ', thisCell)
    //   return true 
    // }
    console.log('TEST IN shouldComponentUpdate')
    return false
  }

  headerValues () {
    const { row, col } = this.props;

    if (col === 0 && row > 0) {
      this.setState({
        value: row
      })
    }

    if (row === 0 && col > 0) {
      this.setState({
        value: col
      })
    }
  }

  forceEdit = (e) => {
    const { currentCell } = this.props;

    if (currentCell && ![37,38,39,40].includes(e.keyCode)) {
      this.setState({
        editable: true
      })
    }
  }

  clearGridOnKey = (e) => {
    const { row, col, prevCell, currentCell, toggleSelected } = this.props;
    const cell = [ row, col ];

    if (row > 0 && col > 0 && [37, 38, 39, 40].includes(e.keyCode)) {

      if ( _.isEqual( cell, prevCell ) ) {
        this.toggleIsSelected(false)
      } else if ( _.isEqual( cell, currentCell ) ) {
        this.toggleIsSelected(true)
      } 
    }

    // if (this.state.editable) {
    //   if (e.keyCode === 13) {

    //     if ( _.isEqual( currentCell, prevCell ) ) {
    //       console.log(currentCell, prevCell)
    //       this.toggleIsSelected(false)
    //       this.toggleEditable(row, col)
    //       toggleSelected(currentCell[0] + 1, currentCell[1])
    //     } else if ( _.isEqual( currentCell, currentCell ) ) {
    //       console.log(currentCell, currentCell)
    //       this.toggleIsSelected(true)
    //     } 
    //   }
    // }
    
  }

  onChangeEvent (e) {
    this.setState({
      value: e.target.value
    })
  }

  onSelect = () => {
    const { row, col, toggleSelected } = this.props;

    if (row > 0 && col > 0) {
      this.setState({
        selected: true,
      })

      toggleSelected(row, col)
    }
  }

  onEnterKeyPress = (e, row, col) => {
    const { toggleSelected } = this.props;

    if (e.charCode === 13) {
      this.toggleEditable(row, col)
      toggleSelected(row + 1, col)
    }
  }

  toggleEditable = () => {
    this.setState({
      editable: !this.state.editable
    })

    this.test()
    this.calculate()
  }

  toggleIsSelected = (value) => {
    this.setState({
      selected: value
    })
  }

  test = () => {
    const { value, editable } = this.state;

    if (value.length === 3 && value[0] === '=') {
      const el = document.getElementById(value.substr(1))
                  .children[0].innerHTML

      this.setState({ 
        mathValue: el
      })
    }
  }

  sum (nums) {
    return nums.split(',')
      .map(int => parseInt(int))
      .reduce((a, b) => a + b)
  }

  calculate = () => {
    const { value, editable } = this.state;
    let result;

    if (value.split( '(' )[0] === '=sum') {
      const args = value.slice(5, value.length - 1)
      result = this.sum( args )
    } else if (value.length > 0 && value[0] === '=') {
      result = math.eval(value.substr(1)) 
    } 

    // switch ( value.split( '(' )[0] ) {
    //   case '=sum':
    //     const args = value.slice(5, value.length - 1)
    //     result = this.sum( args )
    //     break;
    //   case '=':
    //     result = math.eval(value.substr(1))
    //     break;
    //   default:
    //     return;
    // }
    
    this.setState({ 
      mathValue: result
    })
  }

  renderCell () {
    const { value, editable, mathValue } = this.state;

    switch (editable) {
      case true:
        return (
          <input 
            onChange={(e) => this.onChangeEvent(e)} 
            autoFocus 
            type="text" 
            value={value} 
          />
        );
      default:
        return (
          <span>{mathValue ? mathValue : value}</span>
        )
    }
  }

  selectedClass = () =>  {
    return 'cell' + ( this.state.selected ? ' selected' : '' )
  }

  editableClass = () =>  {
    return this.selectedClass() + ( this.state.editable ? ' editable' : '' )
  }

  readOnlyClass = (row) =>  {
    return this.editableClass() + ( row === 0  ? ' read-only' : '' ); 
  }

  defineClasses = (row, col) =>  {
    return this.readOnlyClass(row) + ( col === 0  ? ' col-read-only' : '' ); 
  }

  render () {
    const { row, col, } = this.props;
    console.log('TEST IN RENDER')
    return (
      <td 
        id={`${col}${row}`}
        className={this.defineClasses(row, col)}
        data-row={row} 
        data-column={col} 
        onClick={this.onSelect} 
        onDoubleClick={this.toggleEditable}
        onBlur={this.toggleEditable}
        onKeyPress={(e) => this.onEnterKeyPress(e, row, col)}
      >
        {this.renderCell()}
      </td>
    )

    // return (
    //   <Cell 
    //     row={row}
    //     col={col}
    //     onSelect={this.onSelect}
    //     defineClasses={this.defineClasses}
    //     currentCell={this.props.currentCell}
    //     toggleEditable={this.toggleEditable}
    //   >
    //     { this.renderCell() }
    //   </Cell>
    // )
  }
}

// const selectComputedData = createSelector(
//   state => state.cell.currentCell,
//   state => state.cell.prevCell,
//   (currentCell, prevCell) => ({
//     currentCell, prevCell
//   })
// )

// selector
const getSelectedCell = (state) => state.cell.currentCell
// reselect function
const getSelectedCellState = createSelector(
  [ getSelectedCell ],
  (currentCell) => currentCell
)

function mapStateToProps (state) {
  const { currentCell } = state.cell;

  return {
    currentCell: getSelectedCellState(state)
  }
}

export default connect(mapStateToProps, { toggleSelected })(CellData);































