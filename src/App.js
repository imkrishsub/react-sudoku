import logo from './logo.svg';
import './App.css';
import Game from './components/Game.js';
import { Provider } from 'react-redux';
import store from './store.js';

function App() {
  return (
    <Provider store={store}>
        <Game />
    </Provider>
  );
}

export default App;
