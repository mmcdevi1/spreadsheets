import React from 'react';
import { connect } from 'react-redux';
import Cell from './Cell';

class Row extends React.Component {
  renderColumns () {
    const rows = [];
    const { click, cells, row, blur, toggleSelected, toggleEditable } = this.props;

    for (let i = 0; i < this.props.columns; i++) {
      rows.push (
        <Cell 
          key={i}
          click={click} 
          value="" 
          toggleEditable={toggleEditable}
          blur={blur}
          row={row}
          col={i}
        />
      )
    }

    return rows
  }

  render () {
    return (
      <tr>
        { this.renderColumns() }
      </tr>
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

export default connect(mapStateToProps)(Row);