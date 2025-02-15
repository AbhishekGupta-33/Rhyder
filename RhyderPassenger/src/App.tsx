import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AppRoutes from './navigation/AppRoutes';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
