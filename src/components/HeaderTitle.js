// HeaderTitle
import { View, Text, Image, StyleSheet } from 'react-native';

const LogoWithTitle = ({ title }) => (
	<View style={styles.container}>
		<Image source={require('../../assets/esportevale-removebg-preview.png')} style={styles.logo} />
		<Text style={styles.title}>{title}</Text>
	</View>
);

export const options = (title) => {
	return {
		headerStyle: {
			backgroundColor: '#0047AB',
		},
		headerTitle: () => <LogoWithTitle title={title} />,
		headerTintColor: '#FFD700',
	};
};

const styles = StyleSheet.create({
	container: { flexDirection: 'row', alignItems: 'center' },
	logo: { width: 40, height: 40, resizeMode: 'contain', marginRight: 10 },
	title: { fontSize: 20, fontWeight: 'bold', color: '#FFD700' },
});
