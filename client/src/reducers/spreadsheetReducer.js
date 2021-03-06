import actions from '../actions/spreadsheet';
import { LEFT_KEY, UP_KEY, RIGHT_KEY, DOWN_KEY } from '../keys';

const { GENERATE_CELLS, FORCE_EDIT, CELL_SELECTED, KEY_PRESSED } = actions;

const translate = {
  [LEFT_KEY]:  [ 0, -1],
  [UP_KEY]:    [-1,  0],
  [RIGHT_KEY]: [ 0,  1],
  [DOWN_KEY]:  [ 1,  0]
}

// could use zipWith from Ramda/Haskell/etc.
const applyTranslation = (translation, current) => {
  return [
    current[0] + translation[0],
    current[1] + translation[1]
  ]
}

// could use clamp from Ramda/Lodash etc.
const clamp = (val, min, max) => {
  if (val < min) return min
  if (val > max) return max
  return val
}

const generateCells = (rows, cols) => {
  const grid = new Array(rows)

  for (let i = 0; i < rows; i++) {
    grid[i] = Array.from({length: cols}).map(() => {
      return { value: '' }
    })
  }
  console.log(grid)
  return grid
}

const initialState = {
  rows: 25,
  columns: 25,
  cells: [],
  currentCell: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GENERATE_CELLS: {
      const cells = generateCells(state.rows, state.columns)
      return {
        ...state,
        cells
      }
    }
    case CELL_SELECTED:
      return {
        ...state,
        currentCell: action.payload,
      }
    case KEY_PRESSED: {
      const translation = translate[action.payload]
      if (!translation) return state
      const [newRow, newCol] = applyTranslation(translation, state.currentCell)
      const newPosition = [
        clamp(newRow, 1, state.rows - 1),
        clamp(newCol, 1, state.columns - 1)
      ]
      return {
        ...state,
        currentCell: newPosition
      }
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
