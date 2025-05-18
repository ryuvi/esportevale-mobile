// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator'; // Importa o AppNavigator
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
	return (
		<AuthProvider>
			<NavigationContainer>
				<AppNavigator /> {/* O AppNavigator cuida das telas */}
			</NavigationContainer>
		</AuthProvider>
	);
}
