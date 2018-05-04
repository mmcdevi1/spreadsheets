import React from 'react';
import Row from '../components/Row';
import Table from '../components/Table';

class Spreadsheet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rows: 50,
      columns: 10,
      cells: []
    }
  }

  componentDidMount () {
  	const { rows, columns, cells } = this.state;

  	const grid = new Array(rows);

	  for (let i = 0; i < rows; i++) {
	    grid[i] = Array.from({length: columns}).map(el => {
	    	return { row: i, value: '', isEditable: false }
	    })
	  }

	  this.setState({
	  	cells: cells.concat(grid)
	  })
  }

  toggleEditable = (rowIndex, colIndex) => {
    const { cells } = this.state;
    const copy = cells.slice();

    copy[rowIndex][colIndex].isEditable = !copy[rowIndex][colIndex].isEditable;

    this.setState({
      cells: copy
    })
  }

  renderRows () {
    const { rows, columns, cells } = this.state;
    
    return cells.map((row, i) => {
      return (
        <Row
          key={i}
          columns={columns} 
          row={i}
          click={this.editable} 
          editable={this.toggleEditable} 
          blur={this.toggleEditable} 
          cells={this.state.cells}
        />
      )
    })
  }
  
  render() {
    console.log(this.state.cells)
    return (
      <Table>
         { this.renderRows() }
      </Table>
    )
  }
}

export default Spreadsheet;