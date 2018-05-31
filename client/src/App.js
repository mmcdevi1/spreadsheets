import React from 'react';
import { Provider } from 'react-redux';
import store from './reducers/store';
import Spreadsheet from './containers/Spreadsheet';
import Header from './components/UI/Header';
import Layout from './components/Layout';
import { LEFT_KEY, UP_KEY, RIGHT_KEY, DOWN_KEY } from './keys';

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
      <Provider store={store}>
        <Layout>
          <Header />
          <Spreadsheet />
        </Layout>
      </Provider>
    )
  }
}

export default App;
































