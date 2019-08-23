/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Home from './client/view/home/Home';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './client/controller/reducers';
import thunk from 'redux-thunk';
import NewSquawk from './client/view/newSquawk/NewSquawk';

const store = createStore(reducers, applyMiddleware(thunk));
const App = () => {
  return (
    <Provider store={store}>
      <NewSquawk />
    </Provider>
  );
};

export default App;
