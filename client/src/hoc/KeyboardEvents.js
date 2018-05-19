import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions/spreadsheet';
import { LEFT_KEY, UP_KEY, RIGHT_KEY, DOWN_KEY } from '../keys';

const { toggleSelected, forceEdit } = actions;

export default function (ComposedComponent, toggleSelected) {
  class KeyboardEvents extends React.Component {

    componentDidMount () {
      document.addEventListener('keydown', (e) => this.keyboardEvent(e))
    }

    componentWillUnmount () {
      document.removeEventListener('keydown', (e) => this.keyboardEvent(e))
    }

    keyboardEvent (e) {
      const { toggleSelected, forceEdit, currentCell } = this.props;

      if (e.keyCode === LEFT_KEY) {
        toggleSelected(currentCell[0], currentCell[1] - 1)
      }

      if (e.keyCode === UP_KEY) {
        toggleSelected(currentCell[0] - 1, currentCell[1])
      }

      if (e.keyCode === RIGHT_KEY) {
        toggleSelected(currentCell[0], currentCell[1] + 1)
      }

      if (e.keyCode === DOWN_KEY) {
        toggleSelected(currentCell[0] + 1, currentCell[1])
      }
    }

    render () {
      return <ComposedComponent {...this.props} />
    }

  }

  function mapStateToProps (state) {
    const { 
      currentCell, 
    } = state.cell;

    return {
      currentCell, 
    }
  }

  return connect(mapStateToProps, { toggleSelected, forceEdit })(KeyboardEvents);
}