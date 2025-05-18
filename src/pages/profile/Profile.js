import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
	const { user, logout } = useContext(AuthContext);
	const navigation = useNavigation();

	if (!user) {
		return (
			<View style={styles.container}>
				<Text style={styles.message}>Faça login ou crie uma conta para continuar</Text>
				<Button
					onPress={() => navigation.navigate('Login')}
					mode="contained"
					icon={() => <Ionicons name="log-in-outline" size={24} color="white" />}
					style={{ backgroundColor: '#1565C0', width: 200, marginHorizontal: 'auto' }}
				>
					Login
				</Button>
				<View style={{ height: 10 }} />
				<Button
					onPress={() => navigation.navigate('Cadastro')}
					mode="contained"
					icon={() => <Ionicons name="person-add-outline" size={24} color="white" />}
					style={{ backgroundColor: '#1565C0', width: 200, marginHorizontal: 'auto' }}
				>
					Criar conta
				</Button>
			</View>
		);
	}

	const menuOptions = [
		{
			id: '1',
			title: 'Escrever Notícias',
			action: () => navigation.navigate('Dashboard'),
		},
		{
			id: '2',
			title: 'Logout',
			action: logout,
		},
	];

	return (
		<View style={styles.container}>
			<FlatList
				data={menuOptions}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View style={styles.item}>
						<Button onPress={item.action} style={{ backgroundColor: '#1565C0' }} textColor='#fff'>
							{item.title}
						</Button>
					</View>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 20, justifyContent: 'center' },
	message: { fontSize: 16, marginBottom: 20, textAlign: 'center' },
	item: { marginVertical: 8 },
});
