import React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { List, Divider, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({ navigation }) {
  const handleLogout = async () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('userToken');
            navigation.replace('Login');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Minha Conta</Text>

      <Divider />

      <List.Section>
        <List.Item
          title="Gerenciar Notícias"
          description="Acesse o painel com suas notícias"
          left={(props) => <List.Icon {...props} icon="newspaper-variant-outline" />}
          onPress={() => navigation.navigate('Dashboard')}
        />
      </List.Section>

      <Divider />

      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.logoutButton}
        buttonColor="#e53935"
      >
        Sair da Conta
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  logoutButton: {
    marginTop: 30,
  },
});
