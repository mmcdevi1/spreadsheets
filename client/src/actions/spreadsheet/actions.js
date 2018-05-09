const actions = {
  GENERATE_CELLS: 'GENERATE_CELLS',
  CELL_SELECTED: 'CELL_SELECTED',
  FORCE_EDIT: 'FORCE_EDIT',

  generateCells: (rows, cols) => {
    return dispatch => {
      const grid = new Array(rows);

      for (let i = 0; i < rows; i++) {
        grid[i] = Array.from({length: cols}).map(el => {
          return { value: '' }
        })
      }

      dispatch({
        type: actions.GENERATE_CELLS,
        payload: grid
      })
    }
  },

  toggleSelected: (row, col) => {
    return dispatch => {   
      dispatch({
        type: actions.CELL_SELECTED,
        payload: [row, col]
      })
    }
  },

  forceEdit: (cells, currentCell) => {
    return dispatch => {
      
      const copy = cells.slice();
      copy[currentCell[0]][currentCell[1]].isEditable = true

      dispatch({
        type: actions.FORCE_EDIT,
        payload: copy
      })
    }
    
  },

  toggleEditable: () => {
    return dispatch => {
      dispatch({

      })
    }
  }


}

export default actions;