import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions/spreadsheet';

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
      const { toggleSelected, forceEdit, selectedCell, cells } = this.props;

      if (e.keyCode === 37) {
        toggleSelected(selectedCell[0], selectedCell[1] - 1)
      }

      if (e.keyCode === 38) {
        toggleSelected(selectedCell[0] - 1, selectedCell[1])
      }

      if (e.keyCode === 39) {
        toggleSelected(selectedCell[0], selectedCell[1] + 1)
      }

      if (e.keyCode === 40) {
        toggleSelected(selectedCell[0] + 1, selectedCell[1])
      }
    }

    render () {
      return <ComposedComponent {...this.props} />
    }

  }

  function mapStateToProps (state) {
    const { 
      selectedCell, 
    } = state.cell;

    return {
      selectedCell, 
    }
  }

  return connect(mapStateToProps, { toggleSelected, forceEdit })(KeyboardEvents);
}