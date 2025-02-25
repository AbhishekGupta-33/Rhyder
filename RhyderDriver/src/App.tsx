import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AppRoutes from './navigation/AppRoutes';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {navigationRef} from './utils/NavigationService';
import {AppProvider} from './context/AppContext';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppProvider>
        <NavigationContainer ref={navigationRef}>
          <AppRoutes />
        </NavigationContainer>
      </AppProvider>
    </Provider>
  );
};

export default App;
