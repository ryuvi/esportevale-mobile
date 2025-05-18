import React, { forwardRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { options } from '../components/HeaderTitle';
import CompetitionList from '../pages/competition/CompetitionList';
import CompetitionPage from '../pages/competition/CompetitionPage';

const CompetitionStack = createStackNavigator();
const lOptions = options('Competições');

const CompetitionStackNavigator = forwardRef((props, ref) => (
  <CompetitionStack.Navigator ref={ref}>
    <CompetitionStack.Screen name="CompetitionList" component={CompetitionList} options={lOptions} />
    <CompetitionStack.Screen name="CompetitionPage" component={CompetitionPage} options={lOptions} />
  </CompetitionStack.Navigator>
));

export default CompetitionStackNavigator;
