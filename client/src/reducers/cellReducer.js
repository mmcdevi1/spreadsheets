import actions from '../actions/spreadsheet';

const { CELL_SELECTED } = actions;

const initialState = {
  currentCell: [],
  prevCell: [],
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case CELL_SELECTED:
      return {
        ...state,        
        currentCell: action.payload,
        prevCell: state.currentCell,
      }
    default:
      return state;
  }
}

export default reducer;