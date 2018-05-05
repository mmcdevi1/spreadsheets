import React from 'react';
import { connect } from 'react-redux';
import Row from '../components/Row';
import Table from '../components/Table';
import KeyboardEvents from '../hoc';
import { LEFT_KEY, UP_KEY, RIGHT_KEY, DOWN_KEY, SPACE_KEY } from '../keys';
import actions from '../actions/spreadsheet';

const { generateCells, toggleSelected } = actions;

class Spreadsheet extends React.Component {
  componentDidMount () {
    const { rows, columns, generateCells, cells, selectedCell } = this.props;

    generateCells(rows, columns)
  }

  toggleEditable = (row, col) => {
    const { cells, selectedCell } = this.props;
    const copy = cells.slice();

    if (row > 0 && col > 0) {
      copy[row][col].isEditable = !copy[row][col].isEditable;
    }

    this.setState({
      cells: copy
    })
  }

  renderRows () {
    const { rows, columns, cells, toggleSelected } = this.props;
    
    return cells.map((row, i) => {
      return (
        <Row
          key={i}
          columns={columns} 
          row={i}
          click={this.editable} 
          toggleSelected={toggleSelected}
          toggleEditable={this.toggleEditable}  
          blur={this.toggleEditable} 
        />
      )
    })
  }
  
  render() {
    return (
      <div>
        <Table>
           { this.renderRows() }
        </Table>
      </div>
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

export default connect(mapStateToProps, { generateCells, toggleSelected })(KeyboardEvents(Spreadsheet))

// <KeyBoardEvent toggleSelected={this.toggleSelected} selectedCell={this.state.selectedCell} />