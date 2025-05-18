// ContentCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';

export default function ContentCard({ content, onPress, isEdit=false }) {
	const stripHtml = (html) => {
		if (!html) return '';
		return html.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...';
	};

	return (
		<TouchableOpacity onPress={onPress} style={styles.card}>
			<View>
				<Text style={styles.title}>{content.post_title}</Text>
				<Text style={styles.description}>{stripHtml(content.post_content)}</Text>
			</View>
			<View>
				<Text style={{ textAlign: 'right', color: '#0008' }}>{dayjs(content.post_created).format('DD/MM/YYYY HH:mm')}</Text>
				{ isEdit && <Text style={{ color: "#ababab", fontSize: 10 }}>Clique aqui para abrir a edição da notícia...</Text> }
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		padding: 15,
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
		backgroundColor: '#fff',
		shadowColor: 'black',
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 5,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	description: {
		fontSize: 14,
		color: '#555',
		marginTop: 8,
	},
});
