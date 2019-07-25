import React from 'react';
import AppContainer from './View/rotas'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducers from './View/Componente/Reducers';

let store = createStore(Reducers);

export default class App extends React.Component {
  
  render() {
    return(
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    );  
  }
  
}
