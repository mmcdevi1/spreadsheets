import React from 'react';
import { connect } from 'react-redux';
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
      isSelected: false,
      isEditable: false,
    }
  }

  componentDidMount () {
    const { row, col, selectedCell, prevCell } = this.props;
    const currentCell = [ row, col ];

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

    // window.addEventListener('click', (e) => this.clearGrid(e))
    // window.addEventListener('keydown', (e) => this.clearGridOnKey(e))
    // window.addEventListener('keydown', (e) => this.forceEdit(e))
  }  

  componentWillUnmount () {
    // window.removeEventListener('click', (e) => this.clearGrid(e))
    // window.removeEventListener('keydown', (e) => this.clearGridOnKey(e))
    // window.removeEventListener('keydown', (e) => this.forceEdit(e))
  }

  // componentWillUpdate () {
  //   const { row, col, selectedCell, prevCell } = this.props;
  //   const currentCell = [ row, col ];

  //   if ( _.isEqual( currentCell, prevCell ) ) {
  //     this.toggleIsSelected(false)
  //   } else if ( _.isEqual( currentCell, selectedCell ) ) {
  //     this.toggleIsSelected(true)
  //   }
  // }

  // forceEdit = (e) => {
  //   const { row, col, toggleSelected, selectedCell } = this.props;

  //   if (selectedCell && ![37,38,39,40].includes(e.keyCode)) {
  //     this.setState({
  //       isEditable: true
  //     })
  //   }
  // }

  clearGrid = (e) => {
    const { row, col, prevCell, selectedCell } = this.props;
    const currentCell = [ row, col ];

    // Lodash.isEqual comparing two arrays for equality
    if ( notEqual( prevCell, selectedCell ) && _.isEqual( currentCell, prevCell ) ) {
      this.setState({
        isSelected: false
      })
    }
  }

  clearGridOnKey = (e) => {
    const { row, col, prevCell, selectedCell, toggleSelected } = this.props;
    const currentCell = [ row, col ];

    if (row > 0 && col > 0 && [37, 38, 39, 40].includes(e.keyCode)) {

      if ( _.isEqual( currentCell, prevCell ) ) {
        this.toggleIsSelected(false)
      } else if ( _.isEqual( currentCell, selectedCell ) ) {
        this.toggleIsSelected(true)
      } 
    }

    // if (this.state.isEditable) {
    //   if (e.keyCode === 13) {

    //     if ( _.isEqual( currentCell, prevCell ) ) {
    //       console.log(currentCell, prevCell)
    //       this.toggleIsSelected(false)
    //       this.toggleEditable(row, col)
    //       toggleSelected(selectedCell[0] + 1, selectedCell[1])
    //     } else if ( _.isEqual( currentCell, selectedCell ) ) {
    //       console.log(currentCell, selectedCell)
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
    const { row, col, toggleSelected, selectedCell } = this.props;

    if (row > 0 && col > 0) {
      this.setState({
        isSelected: true
      })

      toggleSelected(row, col)
    }
  }

  onEnterKeyPress = (e, row, col) => {
    const { toggleSelected, cells, selectedCell, prevCell } = this.props;

    if (e.charCode === 13) {
      this.toggleEditable(row, col)
      toggleSelected(row + 1, col)
    }
  }

  toggleEditable = () => {
    this.setState({
      isEditable: !this.state.isEditable
    })
  }

  toggleIsSelected = (value) => {
    this.setState({
      isSelected: value
    })
  }

  renderCell () {
    const { value, isEditable } = this.state;

    switch (isEditable) {
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
    return 'cell' + ( this.state.isSelected ? ' selected' : '' )
  }

  editableClass () {
    return this.selectedClass() + ( this.state.isEditable ? ' editable' : '' )
  }

  readOnlyClass (row) {
    return this.editableClass() + ( row === 0  ? ' read-only' : '' ); 
  }

  defineClasses (row, col) {
    return this.readOnlyClass(row) + ( col === 0  ? ' col-read-only' : '' ); 
  }

  render () {
    const { 
      row, 
      col, 
      isEditable, 
      toggleSelected,  
      isSelected, 
      cells, 
      selectedCell 
    } = this.props;

    return (
      <td 
        className={this.defineClasses(row, col)}
        data-row={row} 
        data-column={col} 
        onClick={this.onSelect} 
        onDoubleClick={() => this.toggleEditable()}
        onBlur={() => this.toggleEditable()}
        onKeyPress={(e) => this.onEnterKeyPress(e, row, col)}
      >
        {this.renderCell()}
      </td>
    )
  }
}

function mapStateToProps (state) {
  const { 
    rows, 
    columns, 
    cells 
  } = state.spreadsheet;

  const { selectedCell, prevCell } = state.cell;

  return {
    rows, 
    columns, 
    selectedCell, 
    cells,
    prevCell,
  }
}

export default connect(mapStateToProps, { toggleSelected })(Cell);































