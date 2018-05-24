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
    this.props.generateCells()
  }

  renderRows () {
    const { cells } = this.props;

    return cells.map((row, i) => {
      return (
        <Row
          key={i}
          row={i}
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
    cells,
  } = state.spreadsheet;

  return {
    rows,
    columns,
    cells,
  }
}

export default connect(
  mapStateToProps,
  { generateCells, toggleSelected }
)(KeyboardEvents(Spreadsheet))
