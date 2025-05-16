// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';  // Importa o AppNavigator

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator /> {/* O AppNavigator cuida das telas */}
    </NavigationContainer>
  );
}
