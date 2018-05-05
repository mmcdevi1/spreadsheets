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
        toggleSelected(selectedCell[0], selectedCell[1] - 1, cells, selectedCell)
      }

      if (e.keyCode === 38) {
        toggleSelected(selectedCell[0] - 1, selectedCell[1], cells, selectedCell)
      }

      if (e.keyCode === 39) {
        toggleSelected(selectedCell[0], selectedCell[1] + 1, cells, selectedCell)
      }

      if (e.keyCode === 40) {
        toggleSelected(selectedCell[0] + 1, selectedCell[1], cells, selectedCell)
      }

      if (selectedCell && ![37,38,39,40].includes(e.keyCode)) {
        forceEdit(cells, selectedCell)
      }
    }

    render () {
      return <ComposedComponent {...this.props} />
    }

  }

  function mapStateToProps (state) {
    const { 
      columns, 
      selectedCell, 
      cells 
    } = state.spreadsheet;

    return {
      columns, 
      selectedCell, 
      cells,
    }
  }

  return connect(mapStateToProps, { toggleSelected, forceEdit })(KeyboardEvents);
}