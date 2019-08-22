/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Home from './client/view/home/Home';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './client/controller/reducers';

const store = createStore(reducers);
const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default App;
