import React from 'react';

class Cell extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      value: '',
    }
  }

  componentDidMount () {
    if (this.props.column === 0 && this.props.row > 0) {
      this.setState({
        value: this.props.row
      })
    }

    if (this.props.row === 0 && this.props.column > 0) {
      this.setState({
        value: this.props.column
      })
    }
  }

  onChangeEvent (e) {
    this.setState({
      value: e.target.value
    })
  }

  onEnterKeyPress = (e, row, col) => {
    if (e.charCode === 13) {
      this.props.toggleEditable(row, col)
      this.props.toggleSelected(row + 1, col)
    }

    // if (e.charCode === 39) {
    //   this.props.toggleSelected(row + 1, col)
    // }
    
  }

  // test = () => {
  //   const { row, column, isEditable, toggleSelected, toggleEditable, isSelected } = this.props;
  //   document.addEventListener('keydown', function (e) {
  //     if (e.keyCode === 39) {
  //       console.log(e.keyCode)
  //       toggleSelected(row, column + 1)
  //     }
  //   })
  // }

  renderCell () {
    const { 
      row, 
      column, 
      isEditable, 
      isSelected, 
      toggleSelected 
    } = this.props;

    const { value } = this.state;

    switch (isEditable) {
      case true:
        return (
          <input onChange={(e) => this.onChangeEvent(e)} autoFocus type="text" value={value} tabIndex="0" />
        );
      default:
        return (
          <span>{value}</span>
        )
    }
  }

  selectedClass () {
    return 'cell' + ( this.props.isSelected ? ' selected' : '' )
  }

  editableClass () {
    return this.selectedClass() + ( this.props.isEditable ? ' editable' : '' )
  }

  readOnlyClass (row) {
    return this.editableClass() + ( row === 0  ? ' read-only' : '' ); 
  }

  defineClasses (row, col) {
    return this.readOnlyClass(row) + ( col === 0  ? ' col-read-only' : '' ); 
  }

  render () {
    const { row, column, isEditable, toggleSelected, toggleEditable, isSelected } = this.props;

    return (
      <td 
        className={this.defineClasses(row, column)}
        data-row={row} 
        data-column={column} 
        onClick={() => toggleSelected(row, column)} 
        onDoubleClick={() => toggleEditable(row, column)}
        onBlur={() => toggleEditable(row, column)}
        onKeyPress={(e) => this.onEnterKeyPress(e, row, column)}
      >
        {this.renderCell()}
      </td>
    )
  }
}

export default Cell;



/*
  NOTES:

  td add class 'selected' when selected but keep span element.
  Once editing, add class 'editing' and change span to input 
  with double click or onChange

  export const TAB_KEY = 9
  export const ENTER_KEY = 13
  export const ESCAPE_KEY = 27
  export const LEFT_KEY = 37
  export const UP_KEY = 38
  export const RIGHT_KEY = 39
  export const DOWN_KEY = 40
  export const DELETE_KEY = 46
  export const BACKSPACE_KEY = 8

*/



























