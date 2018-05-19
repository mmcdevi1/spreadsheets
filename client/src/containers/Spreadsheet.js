import React from 'react';
import { connect } from 'react-redux';
import Row from '../components/Row';
import Table from '../components/Table';
import KeyboardEvents from '../hoc';
// import { LEFT_KEY, UP_KEY, RIGHT_KEY, DOWN_KEY, SPACE_KEY } from '../keys';
import actions from '../actions/spreadsheet';

const { generateCells, toggleSelected } = actions;

class Spreadsheet extends React.Component {
  componentDidMount () {
    const { rows, columns, generateCells } = this.props;

    generateCells(rows, columns)
  }

  renderRows () {
    const { rows, columns, cells, toggleSelected, currentCell } = this.props;
    
    return cells.map((row, i) => {
      return (
        <Row
          onClick={() => console.log(i)}
          key={i}
          columns={columns} 
          row={i}
          blur={this.toggleEditable} 
          currentCell={currentCell}
        />
      )
    })
  }
  
  render () {
    console.log('[SPREADSHEET COMPONENT]: Is Rendering')
    return (
      <Table>
         { this.renderRows() }
      </Table>
    )
  }
}

function mapStateToProps (state) {
  const { 
    rows, 
    columns,
    cells
  } = state.spreadsheet;

  const { currentCell } = state.cell;

  return {
    rows, 
    columns,
    cells,
    currentCell,
  }
}

export default connect(
  mapStateToProps, 
  { generateCells, toggleSelected }
)(KeyboardEvents(Spreadsheet))











































