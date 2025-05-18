import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { Divider } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import { Chip } from 'react-native-paper';

export default function NewsDetail({ route }) {
	const { title, body, tags, author, created } = route.params;
	const { width } = useWindowDimensions();

	const formattedTags = Array.isArray(tags)
		? `Categorias: ${tags.map((tag) => tag?.nome || tag).join(', ')}`
		: `Categorias: ${tags}`;

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<View>
				<Text>Autor: {author}</Text>
				<Text style={styles.categories}>Data: {created}</Text>
				<View style={{ flexDirection: 'row', flexWrap: 'wrap', margin: 5 }}>
					{Array.isArray(tags) ? (
						tags.map((tag, index) => (
							<Chip key={index} style={{ margin: 2, backgroundColor: '#6495ED' }} mode="flat">
								<Text style={{ color: '#FFD700' }}>{tag}</Text>
							</Chip>
						))
					) : (
						<Chip key={tags} style={{ margin: 2, backgroundColor: '#6495ED' }} mode="flat">
							<Text style={{ color: '#FFD700' }}>{tags}</Text>
						</Chip>
					)}
				</View>
				{/* {formattedTags && <Text style={styles.categories}>{formattedTags}</Text>} */}
			</View>
			<Divider />
			<View style={{ minHeight: '100%', flex: 1, marginBottom: 50, marginTop: 10 }}>
				<WebView
					originWhitelist={['*']}
					style={{ flex: 1, backgroundColor: 'transparent' }}
					source={{ html: `<html><body style="font-size: 2.25rem;">${body}</body></html>` }}
				/>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	categories: {
		fontSize: 12,
		color: 'gray',
		marginBottom: 2,
	},
});
