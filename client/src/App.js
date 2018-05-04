import React from 'react';
import Spreadsheet from './containers/Spreadsheet';
import { LEFT_KEY, UP_KEY, RIGHT_KEY, DOWN_KEY, SPACE_KEY } from './keys';

import './App.css';

class App extends React.Component {
  componentDidMount () {
    window.addEventListener("keydown", function(e) {
      if([LEFT_KEY, UP_KEY, RIGHT_KEY, DOWN_KEY].includes(e.keyCode)) {
        e.preventDefault();
      }
    }, false);
  }

  render () {
    return (
      <Spreadsheet />
    )
  }
}

export default App;
































