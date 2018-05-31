import React from 'react';
import { connect } from 'react-redux';
import CellData from './CellData';

class Row extends React.Component {
  renderCells () {
    const { row } = this.props

    return Array(this.props.columns)
    .fill(null)
    .map((_, idx) =>
      <CellData
        key={idx}
        row={row}
        col={idx}
        value=""
      />
    )
  }

  render () {
    console.log('[ROW COMPONENT]: Is Rendering')
    
    return (
      <tr>
        { this.renderCells() }
      </tr>
    )
  }
}

function mapStateToProps (state) {
  const { columns } = state.spreadsheet

  return {
    columns,
  }
}

export default connect(mapStateToProps)(Row)
