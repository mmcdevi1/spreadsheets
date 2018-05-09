import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import actions from '../actions/spreadsheet';
import _ from 'lodash';

const { toggleSelected } = actions;

const notEqual = (arr, arr2) => {
  return !_.isEqual(arr, arr2)
}

class Cell extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      value: '',
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
      console.log('This is the cell, ', thisCell)
      return true 
    }

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

    console.log(this.state)
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
  }

  toggleIsSelected = (value) => {
    this.setState({
      selected: value
    })
  }

  renderCell () {
    const { value, editable } = this.state;

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
          <span>{value}</span>
        )
    }
  }

  selectedClass () {
    return 'cell' + ( this.state.selected ? ' selected' : '' )
  }

  editableClass () {
    return this.selectedClass() + ( this.state.editable ? ' editable' : '' )
  }

  readOnlyClass (row) {
    return this.editableClass() + ( row === 0  ? ' read-only' : '' ); 
  }

  defineClasses (row, col) {
    return this.readOnlyClass(row) + ( col === 0  ? ' col-read-only' : '' ); 
  }

  render () {
    const { row, col, } = this.props;

    return (
      <td 
        id={`${row}-${col}`}
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
// const getSelectedCell = (state) => state.cell.currentCell
// const getPrevCell = (state) => state.cell.prevCell
// // reselect function
// const getSelectedCellState = createSelector(
//   [ getSelectedCell ],
//   (currentCell) => currentCell
// )

// const getPrevCellState = createSelector(
//   [ getPrevCell ],
//   (prevCell) => prevCell
// )

function mapStateToProps (state) {
  const { currentCell, prevCell } = state.cell;

  return {
    currentCell,
    prevCell,
  }
}

export default connect(mapStateToProps, { toggleSelected })(Cell);































