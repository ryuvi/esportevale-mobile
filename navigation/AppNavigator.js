// AppNavigator.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; // Importe createStackNavigator
import { Ionicons } from '@expo/vector-icons';
import { View, Image, Text, StyleSheet } from 'react-native';

// Públicos
// News
import News from '../pages/public/News';
import NewsPage from '../pages/public/NewsPage'; // Importe NewsPage
// Competition
import Competition from '../pages/public/CompetitionPage';
import CompetitionList from '../pages/public/CompetitionList';

import MatchPage from '../pages/public/MatchPage';
import MatchList from '../pages/public/MatchList';

import PageTest from '../pages/PageTest';

const Tab = createBottomTabNavigator();
const NewsStack = createStackNavigator(); // Crie um StackNavigator para a aba de Notícias
const CompetitionStack = createStackNavigator();
const MatchStack = createStackNavigator();

const LogoWithTitle = ({ title }) => (
  <View style={styles.container}>
    <Image
      source={require('../assets/esportevale-removebg-preview.png')}
      style={styles.logo}
    />
    <Text style={styles.title}>{title}</Text>
  </View>
);

// Crie um componente para o StackNavigator de Notícias
function NewsStackNavigator() {
  return (
    <NewsStack.Navigator>
      <NewsStack.Screen
        name="NewsList" // Nome interno para a lista de notícias
        component={News}
        options={{ headerStyle: { backgroundColor: '#0047AB' }, headerTitle: () => <LogoWithTitle title="Notícias" />, headerTintColor: '#FFD700' }}
      />
      <NewsStack.Screen
        name="NewsDetail"
        component={NewsPage}
        options={{ headerStyle: { backgroundColor: '#0047AB' }, headerTitle: () => <LogoWithTitle title="Notícia" />, headerTintColor: '#FFD700' }}
      />
    </NewsStack.Navigator>
  );
}

function CompetitionStackNavigator() {
  return (
    <CompetitionStack.Navigator>
      <CompetitionStack.Screen 
        name="CompetitionList"
        component={CompetitionList}
        options={{ headerStyle: { backgroundColor: '#0047AB' }, headerTitle: () => <LogoWithTitle title="Competições" />, headerTintColor: '#FFD700' }}
      />
      <CompetitionStack.Screen
        name="CompetitionPage"
        component={Competition}
        options={{ headerStyle: { backgroundColor: '#0047AB' }, headerTitle: () => <LogoWithTitle title="Competições" />, headerTintColor: '#FFD700' }}
      />
    </CompetitionStack.Navigator>
  )
}

function MatchStackNavigator()
{
  return (
    <MatchStack.Navigator>
      <MatchStack.Screen 
        name="MatchList"
        component={MatchList}
        options={{ headerStyle: { backgroundColor: '#0047AB' }, headerTitle: () => <LogoWithTitle title="Partidas" />, headerTintColor: '#FFD700' }}
      />
      <MatchStack.Screen 
        name="MatchPage"
        component={MatchPage}
        options={{ headerStyle: { backgroundColor: '#0047AB' }, headerTitle: () => <LogoWithTitle title="Partidas" />, headerTintColor: '#FFD700' }}
      />
    </MatchStack.Navigator>
  )
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Notícias') iconName = 'newspaper-outline';
          else if (route.name === 'Competições') iconName = 'trophy-outline';
          else if (route.name === 'Partidas') iconName = 'football-outline';
          else if (route.name === 'Perfil') iconName = 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFD700',
        tabBarActiveBackgroundColor: '#004793',
        tabBarInactiveTintColor: '#FFD70088',
        tabBarStyle: {
          backgroundColor: '#0047AB',
        }
      })}
    >
      <Tab.Screen
        name="Notícias"
        component={NewsStackNavigator} // Use o NewsStackNavigator aqui
        options={{ headerShown: false }} // O header será gerenciado pelo StackNavigator interno
      />
      <Tab.Screen
        name="Competições"
        component={CompetitionStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Partidas"
        component={MatchStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Perfil"
        component={PageTest}
        options={{ headerStyle: { backgroundColor: '#0047AB' }, headerTitle: () => <LogoWithTitle title="Perfil" /> }}
      />
    </Tab.Navigator>
  );
}

const AppNavigator = () => {
  return (
    <MainTabs /> // Renderiza diretamente as abas
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 40, height: 40, resizeMode: 'contain', marginRight: 10 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#FFD700' },
});

export default AppNavigator;