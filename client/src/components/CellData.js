import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions/spreadsheet';
import _ from 'lodash';
import math from 'mathjs';
import { header } from '../utils/alphabet';

// import Cell from './Cell_test';

const { toggleSelected } = actions;

class CellData extends React.Component {
  constructor (props) {
    super (props)

    const { row, col } = props;
    const isLeftCell = col === 0 && row > 0
    const isTopCell = row === 0 && col > 0
    const value = (isLeftCell && row) || (isTopCell && header(col - 1)) || ''

    this.state = {
      value,
      mathValue: null,
      editable: false,
    }

  }

  componentDidMount () {
    document.addEventListener('keydown', this.forceEdit)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.forceEdit)
  }

  onChangeEvent = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  onSelect = () => {
    const { row, col, toggleSelected } = this.props;

    if (row > 0 && col > 0) {
      // this.setState({
      //   selected: true,
      // })

      toggleSelected(row, col)
    }
  }

  forceEdit = (e) => {  
    const { currentCell, selected } = this.props;  

    if (selected && ![37,38,39,40].includes(e.keyCode)) { 
      this.setState({  
        editable: true 
      }) 
    }  
  }

  onEnterKeyPress = (e, row, col) => {
    const { toggleSelected } = this.props;

    if (e.charCode === 13) {
      this.toggleEditable(row, col)
      toggleSelected(row + 1, col)
    }
  }

  toggleEditable = () => {
    this.setState({
      editable: !this.state.editable
    })

    this.test()
    this.calculate()
  }

  test = () => {
    const { value, editable } = this.state;

    if (value.length === 3 && value[0] === '=') {
      const el = document.getElementById(value.substr(1))
                  .children[0].innerHTML

      this.setState({
        mathValue: el
      })
    }
  }

  sum (nums) {
    return nums.split(',')
      .map(int => parseInt(int))
      .reduce((a, b) => a + b)
  }

  calculate = () => {
    const { value, editable } = this.state;
    let result;

    if (value.split( '(' )[0] === '=sum') {
      const args = value.slice(5, value.length - 1)
      result = this.sum( args )
    } else if (value.length > 0 && value[0] === '=') {
      result = math.eval(value.substr(1))
    }

    this.setState({
      mathValue: result
    })
  }

  renderCell () {
    const { value, editable, mathValue } = this.state;

    switch (editable) {
      case true:
        return (
          <input
            onChange={this.onChangeEvent}
            autoFocus
            type="text"
            value={value}
          />
        );
      default:
        return (
          <span>{mathValue ? mathValue : value}</span>
        )
    }
  }

  selectedClass = () =>  {
    return 'cell' + ( this.props.selected ? ' selected' : '' )
  }

  editableClass = () =>  {
    return this.selectedClass() + ( this.state.editable ? ' editable' : '' )
  }

  readOnlyClass = (row) =>  {
    return this.editableClass() + ( row === 0  ? ' read-only' : '' );
  }

  defineClasses = (row, col) =>  {
    return this.readOnlyClass(row) + ( col === 0  ? ' col-read-only' : '' );
  }

  dragRange = () => {
    if (true) {
      console.log('mouse enter')
    }
  }

  render () {
    const { row, col, } = this.props;

    console.log('[CELL COMPONENT]: Is Rendering', this.props)

    return (
      <td
        id={`${header(col - 1) || 'col'}${row}`}
        className={this.defineClasses(row, col)}
        data-row={row}
        data-column={col}
        onClick={this.onSelect}
        onDoubleClick={this.toggleEditable}
        onBlur={this.toggleEditable}
        onKeyPress={(e) => this.onEnterKeyPress(e, row, col)}
        // onMouseEnter={this.dragRange}
      >
        {this.renderCell()}
      </td>
    )
  }
}

function mapStateToProps (state) {
  const { currentCell } = state.spreadsheet;

  return {
    currentCell
  }
}

function mergeProps (stateProps, dispatchProps, ownProps) {
  return Object.assign({
    selected: _.isEqual(stateProps.currentCell, [ownProps.row, ownProps.col])
  }, _.omit(stateProps, ['currentCell']), dispatchProps, ownProps)
}

export default connect(mapStateToProps, { toggleSelected }, mergeProps)(CellData);
