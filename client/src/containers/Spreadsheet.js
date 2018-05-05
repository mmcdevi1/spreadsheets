import React from 'react';
import Row from '../components/Row';
import Table from '../components/Table';
import KeyBoardEvent from '../components/KeyBoardEvents';
import { LEFT_KEY, UP_KEY, RIGHT_KEY, DOWN_KEY, SPACE_KEY } from '../keys';

class Spreadsheet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rows: 50,
      columns: 20,
      selectedCell: null,
      cells: []
    }
  }

  componentDidMount () {
    const { rows, columns, cells, selectedCell } = this.state;

  	const grid = new Array(rows);

	  for (let i = 0; i < rows; i++) {
	    grid[i] = Array.from({length: columns}).map(el => {
	    	return { row: i, value: '', isEditable: false, isSelected: false }
	    })
	  }

	  this.setState({
	  	cells: cells.concat(grid)
	  })


    document.addEventListener('keydown', function (e) {
      if (this.state.selectedCell && ![37,38,39,40].includes(e.keyCode)) {
        const copy = this.state.cells.slice();
        copy[this.state.selectedCell[0]][this.state.selectedCell[1]].isEditable = true
        this.setState({
          cells: copy
        })
      }
    }.bind(this))
  }

  toggleSelected = (row, col) => {
    const { cells, selectedCell } = this.state;
    const copy = cells.slice();

    if (selectedCell) {
      copy[selectedCell[0]][selectedCell[1]].isSelected = false
    }

    if (row > 0 && col > 0) {
      copy[row][col].isSelected = true;
    }    

    this.setState({
      selectedCell: [row, col],
      cells: copy
    })
  }

  toggleEditable = (row, col) => {
    const { cells, selectedCell } = this.state;
    const copy = cells.slice();

    if (row > 0 && col > 0) {
      copy[row][col].isEditable = !copy[row][col].isEditable;
    }

    this.setState({
      cells: copy
    })
  }

  move = () => {
    console.log('press')
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
          toggleSelected={this.toggleSelected}
          toggleEditable={this.toggleEditable}  
          blur={this.toggleEditable} 
          cells={this.state.cells}
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
        <KeyBoardEvent toggleSelected={this.toggleSelected} selectedCell={this.state.selectedCell} />
      </div>
    )
  }
}

export default Spreadsheet;