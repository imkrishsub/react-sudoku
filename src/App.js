import './App.css';
import React from 'react';
import Game from './components/Game.js';
import { Provider } from 'react-redux';
import store from './store';

class App extends React.Component {
    render() {
        return (
          <Provider store={store}>
              <Game />
          </Provider>
        );
    }
}

export default App;
