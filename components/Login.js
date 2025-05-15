import React, { useState } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../api/api'; // sua função de login
import Logo from '../assets/esportevale-removebg-preview.png';

import {
  TextInput,
  Button,
  Text,
  Card,
  useTheme,
} from 'react-native-paper';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { colors } = useTheme();

  const handleLogin = async () => {
    setError('');
    try {
      const response = await login(email, password);
      if (response.success) {
        await AsyncStorage.setItem('userToken', response.token);
        navigation.replace('Dashboard');
      } else {
        setError(response.message || 'Credenciais inválidas');
      }
    } catch (err) {
      setError('Erro ao fazer login');
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card} mode="elevated">
        <Card.Content style={styles.cardContent}>
          <Image
            source={Logo}
            style={{ width: 150, height: 150, marginBottom: 20 }}
            resizeMode="contain"
          />
          <TextInput
            label="Email"
            mode="outlined"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            label="Senha"
            mode="outlined"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          {error ? (
            <Text style={{ color: colors.error, marginBottom: 10 }}>{error}</Text>
          ) : null}
          <Button mode="contained" onPress={handleLogin}>
            Entrar
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f4f4f4',
  },
  card: {
    paddingVertical: 32,
  },
  cardContent: {
    alignItems: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
});
