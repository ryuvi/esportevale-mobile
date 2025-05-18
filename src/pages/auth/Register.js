import React, { useState, useContext } from 'react';
import { View, TextInput, StyleSheet, Text, Alert } from 'react-native';
import { register } from '../../api/auth';
import { AuthContext } from '../../context/AuthContext';
import { Button } from 'react-native-paper';

export default function Cadastro({ navigation }) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { login } = useContext(AuthContext);

	const handleRegister = async () => {
		try {
			const res = await register(name, email, password);
			await login(res.token);
		} catch (error) {
			Alert.alert('Erro', 'Não foi possível cadastrar. Tente novamente.');
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Criar Conta</Text>
			<TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={setName} />
			<TextInput
				style={styles.input}
				placeholder="E-mail"
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
				autoCapitalize="none"
			/>
			<TextInput
				style={styles.input}
				placeholder="Senha"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>
			<Button mode="elevated" onPress={handleRegister} style={{ backgroundColor: '#1565C0' }}>
				Cadastrar
			</Button>
			<Text style={styles.link} onPress={() => navigation.navigate('Login')}>
				Já tem conta? Faça login
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 20, justifyContent: 'center' },
	title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 12,
		marginBottom: 12,
		borderRadius: 8,
	},
	link: {
		marginTop: 16,
		textAlign: 'center',
		color: '#0047AB',
	},
});
