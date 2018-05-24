import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions/spreadsheet';

const { keyPressed } = actions;

export default function (ComposedComponent) {
  class KeyboardEvents extends React.Component {
    constructor (props) {
      super(props)
      this.keyboardEvent = this.keyboardEvent.bind(this)
    }

    componentDidMount () {
      document.addEventListener('keydown', this.keyboardEvent)
    }

    componentWillUnmount () {
      document.removeEventListener('keydown', this.keyboardEvent)
    }

    keyboardEvent (e) {
      this.props.keyPressed(e.keyCode)
    }

    render () {
      return <ComposedComponent {...this.props} />
    }

  }

  return connect(null, { keyPressed })(KeyboardEvents);
}
