import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions/spreadsheet';

const { toggleSelected } = actions;

class Cell extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      value: '',
      isSelected: false
    }
  }

  componentDidMount () {
    const { row, col, selectedCell, prevCell } = this.props;

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

    // if (row === prevCell[0] && col === prevCell[1]) {
    //   window.addEventListener('click', function () {
    //     console.log('yup')
    //   })
    // }

    // window.addEventListener('click', this.clearGrid)
    
    window.addEventListener('click', function () {
      if ( (this.props.row === this.props.prevCell[0]) && (this.props.col === this.props.prevCell[1]) ) {
        this.setState({
          isSelected: false
        })
      }
    }.bind(this))
  }  

  componentWillUnmount () {
   
      window.removeEventListener('click', this.clearGrid)
    
  }

  clearGrid = () => {
    const { row, col, selectedCell } = this.props;

    // if (selectedCell[0] !== row || selectedCell[1] !== col) {
      // this.setState({
      //   isSelected: false
      // })
    // }

    console.log('hello world')
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
    return this.selectedClass() + ( this.props.isEditable ? ' editable' : '' )
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
      toggleEditable, 
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
        onDoubleClick={() => toggleEditable(row, col)}
        onBlur={() => toggleEditable(row, col)}
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































