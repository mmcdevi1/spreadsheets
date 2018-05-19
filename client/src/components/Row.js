import React from 'react';
import { connect } from 'react-redux';
import CellData from './CellData';

class Row extends React.PureComponent {
  // shouldComponentUpdate (nextProps, nextState) {
  //   if (nextProps.columns)
  // }

  renderColumns () {
    const rows = [];
    const { click, row, blur } = this.props;

    for (let i = 0; i < this.props.columns; i++) {
      rows.push (
        <CellData 
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
    // console.log('ROW RENDERS')
    return (
      <tr>
        { this.renderColumns() }
      </tr>
    )
  }
}

function mapStateToProps (state) {
  const { columns } = state.spreadsheet
  const { currentCell } = state.cell

  return {
    columns,
    currentCell,
  }
}

export default connect(mapStateToProps)(Row);