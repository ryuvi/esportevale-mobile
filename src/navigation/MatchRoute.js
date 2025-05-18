import React, { forwardRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { options } from '../components/HeaderTitle';
import MatchList from '../pages/match/MatchList';
import MatchPage from '../pages/match/MatchPage';

const MatchStack = createStackNavigator();
const lOptions = options('Partidas');

const MatchStackNavigator = forwardRef((props, ref) => (
  <MatchStack.Navigator ref={ref}>
    <MatchStack.Screen name="MatchList" component={MatchList} options={lOptions} />
    <MatchStack.Screen name="MatchPage" component={MatchPage} options={lOptions} />
  </MatchStack.Navigator>
));

export default MatchStackNavigator;
