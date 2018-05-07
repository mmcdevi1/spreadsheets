import actions from '../actions/spreadsheet';

const { CELL_SELECTED } = actions;

const initialState = {
  selectedCell: [],
  prevCell: [],
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case CELL_SELECTED:
      return {
        ...state,
        prevCell: state.selectedCell,
        selectedCell: action.payload,
      }
    default:
      return state;
  }
}

export default reducer;
