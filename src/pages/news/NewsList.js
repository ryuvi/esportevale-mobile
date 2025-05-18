// News.js
import React, { useEffect, useState } from 'react';
import {
	View,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	Text,
	ImageBackground,
	Linking,
} from 'react-native';
import { getContent, getContentTags } from '../../api/news'; // nova função para pegar todas as notícias públicas
import { Divider, Badge } from 'react-native-paper';
import { BlurView } from 'expo-blur';

export default function NewsList({ navigation }) {
	const [news, setNews] = useState([]);

	useEffect(() => {
		const fetchNews = async () => {
			const adLinks = [
				{
					post_title: 'RadioTvAki',
					post_content:
						'Fique por dentro das partidas de futebol, mesmo se não puder assistir ao vivo.',
					url: 'https://radiotvaki.com.br/',
				},
				{
					post_title: 'CarroAki',
					post_content:
						'Procurando um carro? Aqui você pode encontrar carros para todos os gostos.',
					url: 'https://carroaki.com.br/',
				},
			];
			try {
				const data = await getContent(); // sem token
				if (data.success) {
					let news = [];

					if (data.contents.length > 5) {
						data.contents.forEach((item, index) => {
							const newItemNumber = Math.floor(Math.random() * adLinks.length);
							const newItem = adLinks[newItemNumber];
							news.push(item);
							if ((index + 1) % 5 === 0) {
								news.push({
									post_title: newItem.post_title,
									post_content: newItem.post_content,
									post_id: `ad-${news.length}`,
									url: newItem.url,
								});
							}
						});
					} else {
						news = data.contents;
						adLinks.forEach((item, index) => {
							news.push({
								post_title: item.post_title,
								post_content: item.post_content,
								post_id: `ad-${news.length}`,
								url: item.url,
							});
						});
					}

					setNews(news);
				} else {
					console.log('Erro ao carregar notícias públicas:', data.message);
				}
			} catch (error) {
				console.error('Erro ao buscar notícias públicas:', error);
			}
		};

		fetchNews();
	}, []);

	const handleCardSelect = async (item) => {
		const tags = await getContentTags(item.post_id);
		navigation.navigate('NewsDetail', {
			title: item.post_title,
			body: item.post_content,
			tags: tags,
			author: item.post_author_name,
			created: item.post_created,
		});
	};

	const handleCardAd = (url) => {
		Linking.openURL(url);
	};

	const renderItem = ({ item }) =>
		Object.hasOwn(item, 'url') ? (
			<TouchableOpacity style={styles.adCard} onPress={() => handleCardAd(item.url)}>
				<View style={{ flex: 1 }}>
					<Text style={styles.adTitle}>{item.post_title}</Text>
					<Text style={{ ...styles.bodyPreview, width: '90%' }}>
						{item.post_content.replace(/<[^>]+>/g, '').substring(0, 100)}...
					</Text>
				</View>
				<View style={styles.badgeContainer}>
					<Badge style={styles.badge}>Ad</Badge>
				</View>
			</TouchableOpacity>
		) : (
			<TouchableOpacity style={styles.card} onPress={() => handleCardSelect(item)}>
				<View>
					<Text style={styles.title}>{item.post_title}</Text>
					<Text style={styles.bodyPreview}>
						{item.post_content.replace(/<[^>]+>/g, '').substring(0, 100)}...
					</Text>
				</View>
				<View style={{ justifyContent: 'space-around' }}>
					<Text style={{ textAlign: 'right', color: '#0008' }}>{item.post_author_name}</Text>
					<Text style={{ textAlign: 'right', color: '#0008' }}>{item.post_created}</Text>
				</View>
			</TouchableOpacity>
		);

	return (
		<ImageBackground
			source={require('../../../assets/esportevale-removebg-preview.png')}
			style={{ flex: 1 }}
		>
			<BlurView
				style={{
					...StyleSheet.absoluteFillObject,
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					filter: 'blur(.7rem)',
					zIndex: 1,
				}}
				intensity={125}
			/>
			<View style={styles.container}>
				<FlatList
					data={news}
					keyExtractor={(item) => `${item.url ? item.url : item.post_id}`}
					renderItem={renderItem}
					ItemSeparatorComponent={() => <Divider />}
				/>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, zIndex: 2 },
	card: {
		padding: 16,
		backgroundColor: '#fff',
		borderRadius: 8,
		borderWidth: 1,
		marginBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	title: { fontSize: 16, fontWeight: 'bold' },
	bodyPreview: { fontSize: 14, color: '#555', marginTop: 6 },
	adTag: { color: '#555', textAlign: 'right' },

	adCard: {
		padding: 16,
		backgroundColor: '#FFF9C4', // amarelo pastel claro
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#FFECB3', // borda amarelo pastel suave
		marginBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	badgeContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 10,
	},
	badge: {
		backgroundColor: '#90CAF9', // azul pastel
		color: '#1565C0', // azul escuro suave
		fontWeight: 'bold',
		fontSize: 12,
		paddingHorizontal: 10,
	},
	adTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#1565C0', // texto azul escuro suave para título também
	},
});
