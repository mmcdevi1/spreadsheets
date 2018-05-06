import actions from '../actions/spreadsheet';

const { GENERATE_CELLS, FORCE_EDIT } = actions;

const initialState = {
  rows: 5,
  columns: 5,
  cells: [],
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case GENERATE_CELLS:
      return {
        ...state,
        cells: action.payload
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
