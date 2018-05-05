import actions from '../actions/spreadsheet';

const { GENERATE_CELLS, CELL_SELECTED, FORCE_EDIT } = actions;

const initialState = {
  rows: 50,
  columns: 20,
  selectedCell: null,
  cells: [],
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case GENERATE_CELLS:
      return {
        ...state,
        cells: action.payload
      }
    case CELL_SELECTED:
      return {
        ...state,
        cells: action.payload.cells,
        selectedCell: action.payload.selectedCell
      }

    case FORCE_EDIT:
      return {
        ...state,
        cells: action.payload
      }
    default:
      return state;
  }
}

export default reducer;
