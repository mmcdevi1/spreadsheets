import React from 'react';

class Cell extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      value: ''
    }
  }

  onChangeEvent (e) {
    this.setState({
      value: e.target.value
    })
  }

  onEnterKeyPress = (e, row, col) => {
    if (e.charCode === 13) {
      this.props.editable(row, col)
    }
  }

  renderCell () {
    const { row, column, isEditable, editable } = this.props;
    const { value } = this.state;
    let cell;
  
    if (isEditable) {
      cell = <input onChange={(e) => this.onChangeEvent(e)} autoFocus type="text" value={value} />
    } else {
      cell = <span>{value}</span>
    }

    return cell;
  }

  render () {
    const { row, column, isEditable, editable } = this.props;

    return (
      <td 
        className={isEditable ? 'selected editing' : ''}
        data-row={row} 
        data-column={column} 
        onClick={() => editable(row, column)} 
        onBlur={() => editable(row, column)}
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



























