import React from 'react';
import { connect } from 'react-redux';
import Cell from './Cell';

class Row extends React.PureComponent {
  renderColumns () {
    const rows = [];
    const { click, row, blur } = this.props;

    for (let i = 0; i < this.props.columns; i++) {
      rows.push (
        <Cell 
          key={i}
          click={click} 
          value="" 
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
    columns
  } = state.spreadsheet;

  return {
    rows, 
    columns
  }
}

export default connect(mapStateToProps)(Row);