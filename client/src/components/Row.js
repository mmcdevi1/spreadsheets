import React from 'react';
import Cell from './Cell';

class Row extends React.Component {
  renderColumns () {
    const rows = [];
    const { click, cells, row, blur, editable } = this.props;

    for (let i = 0; i < this.props.columns; i++) {
      rows.push (
        <Cell 
          key={i}
          click={click} 
          value="" 
          isEditable={cells[row][i].isEditable}
          editable={editable}
          blur={blur}
          row={row}
          column={i}
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

export default Row;