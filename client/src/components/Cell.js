import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions/spreadsheet';

const { toggleSelected } = actions;

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
    const { toggleSelected, cells, selectedCell } = this.props;

    if (e.charCode === 13) {
      this.props.toggleEditable(row, col)
      toggleSelected(row + 1, col, cells, selectedCell)
    }
  }

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
    const { row, column, isEditable, toggleSelected, toggleEditable, isSelected, cells, selectedCell } = this.props;

    return (
      <td 
        className={this.defineClasses(row, column)}
        data-row={row} 
        data-column={column} 
        onClick={() => toggleSelected(row, column, cells, selectedCell)} 
        onDoubleClick={() => toggleEditable(row, column)}
        onBlur={() => toggleEditable(row, column)}
        onKeyPress={(e) => this.onEnterKeyPress(e, row, column)}
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
    selectedCell, 
    cells 
  } = state.spreadsheet;

  return {
    rows, 
    columns, 
    selectedCell, 
    cells,
  }
}

export default connect(mapStateToProps, { toggleSelected })(Cell);































