import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Image, Text, StyleSheet } from 'react-native';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import ContentEditor from '../components/ContentEditor';
import AuthLoading from '../components/AuthLoading'; // <-- importe

const Stack = createStackNavigator();

const LogoWithTitle = ({ title }) => (
  <View style={styles.container}>
    <Image
      source={require('../assets/esportevale-removebg-preview.png')}
      style={styles.logo}
    />
    <Text style={styles.title}>{title}</Text>
  </View>
);

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="AuthLoading">
      <Stack.Screen name="AuthLoading" component={AuthLoading} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerTitle: () => <LogoWithTitle title="Notícias" /> }} />
      <Stack.Screen name="ContentEditor" component={ContentEditor} options={{ title: 'Criar/Editar Conteúdo' }} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 40, height: 40, resizeMode: 'contain', marginRight: 10 },
  title: { fontSize: 20, fontWeight: 'bold' }
});

export default AppNavigator;
