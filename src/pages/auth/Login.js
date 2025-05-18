import React, { useState, useContext } from 'react';
import { View, TextInput, StyleSheet, Text, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { login as loginRequest } from '../../api/auth';
import { AuthContext } from '../../context/AuthContext';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
  if (!email.trim() || !password.trim()) {
    Alert.alert('Atenção', 'Por favor, preencha e-mail e senha');
    return;
  }

  setLoading(true);
  try {
    const res = await loginRequest(email, password);

    // Exemplo de validação, adapte conforme seu retorno real
    if (res && res.success && res.token) {
      await login(res.token);
      navigation.navigate('Profile')
      // navegação pode ser feita aqui ou dentro do login()
    } else {
      Alert.alert('Erro', res.message || 'Credenciais inválidas');
    }
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível fazer login. Verifique suas credenciais.');
  } finally {
    setLoading(false);
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
      />
      <Button
        onPress={handleLogin}
        mode="elevated"
        style={{ backgroundColor: '#1565C0' }}
        textColor="#fff"
        disabled={loading}
        loading={loading}
      >
        Entrar
      </Button>
      <Text
        style={styles.link}
        onPress={() => !loading && navigation.navigate('Cadastro')}
      >
        Não tem conta? Cadastre-se
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
