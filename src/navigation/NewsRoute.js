import { createStackNavigator } from '@react-navigation/stack';
import { options } from '../components/HeaderTitle';
import NewsList from '../pages/news/NewsList';
import NewsPage from '../pages/news/NewsPage';
import React, { forwardRef } from 'react';

const NewsStack = createStackNavigator();
const lOptions = options('Notícias');

const NewsStackNavigator = forwardRef((props, ref) => (
	<NewsStack.Navigator ref={ref}>
		<NewsStack.Screen name="NewsList" component={NewsList} options={lOptions} />
		<NewsStack.Screen name="NewsDetail" component={NewsPage} options={lOptions} />
	</NewsStack.Navigator>
));

export default NewsStackNavigator;
