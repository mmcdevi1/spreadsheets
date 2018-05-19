import React from 'react';
import { connect } from 'react-redux';
import CellData from './CellData';

class Row extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      row: null
    }
  }

  componentDidMount () {
    this.setState({
      row: this.props.row
    })
  }

  shouldComponentUpdate (nextProps, nextState) {
    // console.log(nextProps.currentCell[0] === this.state.ro)
    if (nextProps.currentCell[0]  === this.state.row) { return true }
    if (this.props.currentCell[0] === this.state.row) { return true }

    return false
  }

  renderColumns () {
    const rows = [];
    const { click, row, blur, currentCell } = this.props;

    for (let i = 0; i < this.props.columns; i++) {
      rows.push (
        <CellData 
          key={i}
          click={click} 
          value="" 
          blur={blur}
          row={row}
          col={i}
          currentCell={currentCell}
        />
      )
    }

    return rows
  }

  render () {
    console.log('[ROW COMPONENT]: Is Rendering')
    return (
      <tr>
        { this.renderColumns() }
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

export default Row