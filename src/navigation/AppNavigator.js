import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { options } from '../components/HeaderTitle';

import MatchStackNavigator from './MatchRoute';
import NewsStackNavigator from './NewsRoute';
import CompetitionStackNavigator from './CompetitionRoute';
import ProfileStackNavigator from './ProfileRoute';

import {
	newsStackRef,
	competitionStackRef,
	matchStackRef,
	profileStackRef,
} from './RootNavigation';

const Tab = createBottomTabNavigator();

const routesIcon = {
	Notícias: 'newspaper-outline',
	Competições: 'trophy-outline',
	Partidas: 'football-outline',
	Perfil: 'person-outline',
};

function MainTabs() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color, size }) => (
					<Ionicons name={routesIcon[route.name]} size={size} color={color} />
				),
				tabBarActiveTintColor: '#FFD700',
				tabBarActiveBackgroundColor: '#004793',
				tabBarInactiveTintColor: '#FFD70088',
				tabBarStyle: { backgroundColor: '#0047AB' },
			})}
		>
			<Tab.Screen
				name="Notícias"
				options={{ headerShown: false }}
			>
				{() => <NewsStackNavigator ref={newsStackRef} />}
			</Tab.Screen>

			<Tab.Screen
				name="Competições"
				options={{ headerShown: false }}
			>
				{() => <CompetitionStackNavigator ref={competitionStackRef} />}
			</Tab.Screen>

			<Tab.Screen
				name="Partidas"
				options={{ headerShown: false }}
			>
				{() => <MatchStackNavigator ref={matchStackRef} />}
			</Tab.Screen>

			<Tab.Screen
				name="Perfil"
				options={{ headerShown: false }}
			>
				{() => <ProfileStackNavigator ref={profileStackRef} />}
			</Tab.Screen>
		</Tab.Navigator>
	);
}

const AppNavigator = () => <MainTabs />;

export default AppNavigator;
