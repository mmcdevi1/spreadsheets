const actions = {
  GENERATE_CELLS: 'GENERATE_CELLS',
  CELL_SELECTED: 'CELL_SELECTED',
  FORCE_EDIT: 'FORCE_EDIT',

  generateCells: (rows, cols) => {
    return dispatch => {
      const grid = new Array(rows);

      for (let i = 0; i < rows; i++) {
        grid[i] = Array.from({length: cols}).map(el => {
          return { row: i, value: '', isEditable: false, isSelected: false }
        })
      }

      dispatch({
        type: actions.GENERATE_CELLS,
        payload: grid
      })
    }
  },

  toggleSelected: (row, col, cells, selectedCell) => {
    return dispatch => {
      // const copy = cells.slice();

      // if (selectedCell) {
      //   copy[selectedCell[0]][selectedCell[1]].isSelected = false
      // }

      // if (row > 0 && col > 0) {
      //   copy[row][col].isSelected = true;
      // }    
      dispatch({
        type: actions.CELL_SELECTED,
        payload: [row, col]
      })
    }
  },

  forceEdit: (cells, selectedCell) => {
    return dispatch => {
      
      const copy = cells.slice();
      copy[selectedCell[0]][selectedCell[1]].isEditable = true

      dispatch({
        type: actions.FORCE_EDIT,
        payload: copy
      })
    }
    
  },


}

export default actions;