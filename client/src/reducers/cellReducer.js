import actions from '../actions/spreadsheet';

const { CELL_SELECTED } = actions;

const initialState = {
  currentCell: [],
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case CELL_SELECTED:
      return {
        ...state,        
        currentCell: action.payload,
      }
    default:
      return state;
  }
}

export default reducer;