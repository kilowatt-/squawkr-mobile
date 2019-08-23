import React from 'react';
import Home from './client/view/home/Home';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './client/controller/reducers';
import thunk from 'redux-thunk';
import NewSquawk from './client/view/newSquawk/NewSquawk';
import DetailedView from './client/view/detailedView/DetailedView';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const AppNavigator = createStackNavigator(
    {
        Home: Home,
        DetailedView: DetailedView,
        NewSquawk: NewSquawk,
    },
    {
        initialRouteName: 'Home',
    });

const AppContainer = createAppContainer(AppNavigator);


const store = createStore(reducers, applyMiddleware(thunk));
const App = () => {
  return (
    <Provider store={store}>
        <AppContainer />
    </Provider>
  );
};

export default App;
