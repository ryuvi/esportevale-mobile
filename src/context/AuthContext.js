import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const loadUser = async () => {
		const token = await AsyncStorage.getItem('userToken');
		if (token) {
			setUser({ token }); // ou pegue mais dados via API
		}
	};

	const login = async (token) => {
		await AsyncStorage.setItem('userToken', token);
		setUser({ token });
	};

	const logout = async () => {
		await AsyncStorage.removeItem('userToken');
		setUser(null);
	};

	useEffect(() => {
		loadUser();
	}, []);

	return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
