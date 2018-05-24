const actions = {
  GENERATE_CELLS: 'GENERATE_CELLS',
  CELL_SELECTED: 'CELL_SELECTED',
  FORCE_EDIT: 'FORCE_EDIT',
  KEY_PRESSED: 'KEY_PRESSED',

  keyPressed: (code) => ({
    type: actions.KEY_PRESSED,
    payload: code
  }),

  generateCells: (rows, cols) => {
    const grid = new Array(rows)

    for (let i = 0; i < rows; i++) {
      grid[i] = Array.from({length: cols}).map(() => {
        return { value: '' }
      })
    }
    console.log(grid)
    return {
      type: actions.GENERATE_CELLS,
      payload: grid
    }
  },

  toggleSelected: (row, col) => {
    return {
      type: actions.CELL_SELECTED,
      payload: [row, col]
    }
  },

  forceEdit: (cells, currentCell) => {
    const copy = cells.slice();
    copy[currentCell[0]][currentCell[1]].isEditable = true

    return {
      type: actions.FORCE_EDIT,
      payload: copy
    }
  },

  toggleEditable: () => {
    return dispatch => {
      dispatch({

      })
    }
  },

}

export default actions;
