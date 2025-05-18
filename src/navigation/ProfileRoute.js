import React, { forwardRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { options } from '../components/HeaderTitle';

import Profile from '../pages/profile/Profile';
import Dashboard from '../pages/profile/Dashboard';
import ContentEditor from '../pages/profile/ContentEditor';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

const ProfileStack = createStackNavigator();
const lOptions = options('Perfil');

const ProfileStackNavigator = forwardRef((props, ref) => (
  <ProfileStack.Navigator ref={ref}>
    <ProfileStack.Screen name="Profile" component={Profile} options={lOptions} />
	<ProfileStack.Screen name="Login" component={Login} options={options('Login')} />
    <ProfileStack.Screen name="Register" component={Register} options={options('Cadastro')} />
    <ProfileStack.Screen name="Dashboard" component={Dashboard} options={options('Minhas Notícias')} />
    <ProfileStack.Screen name="ContentEditor" component={ContentEditor} options={options('Nova Notícia')} />
  </ProfileStack.Navigator>
));

export default ProfileStackNavigator;
