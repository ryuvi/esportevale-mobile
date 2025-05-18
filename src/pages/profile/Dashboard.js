import React, { useState } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import { FAB, Divider } from 'react-native-paper';
import ContentCard from '../../components/ContentCard';
import { isLogged } from '../../api/auth';
import { getContentByUser, getContentTags, deleteContent } from '../../api/news';
import { useFocusEffect } from '@react-navigation/native';

export default function Dashboard({ navigation }) {
	const [content, setContent] = useState([]);

	const fetchContent = async () => {
		try {
			const token = await AsyncStorage.getItem('userToken');
			if (!token) {
				navigation.replace('Login');
				return;
			}

			const data = await getContentByUser(token);
			if (data.success) {
				setContent(data.contents);
			} else {
				console.log('Erro ao carregar conteúdo:', data.message);
			}
		} catch (err) {
			console.log('Erro ao carregar conteúdo', err);
		}
	};

	useFocusEffect(
		React.useCallback(() => {
			fetchContent();
		}, [])
	);

	const handleEdit = async (contentItem) => {
		console.log(contentItem)
		const tags = await getContentTags(contentItem.post_id);
		navigation.navigate('ContentEditor', {
			content: {
				id: contentItem.post_id,
				title: contentItem.post_title,
				tags: tags,
				body: contentItem.post_content,
			},
		});
	};

	const handleDelete = async (id) => {
		Alert.alert('Confirmar exclusão', 'Tem certeza que deseja excluir esta notícia?', [
			{ text: 'Cancelar', style: 'cancel' },
			{
				text: 'Excluir',
				style: 'destructive',
				onPress: async () => {
					try {
						await deleteContent(id);
						fetchContent(); // Atualiza a lista
					} catch (err) {
						console.log('Erro ao excluir conteúdo:', err);
					}
				},
			},
		]);
	};

	const handleCreateNew = () => {
		navigation.navigate('ContentEditor', {
			content: {
				id: '',
				title: '',
				tags: '',
				body: '',
			},
		});
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={content}
				renderItem={({ item }) => (
					<View>
						<ContentCard content={item} onPress={() => handleEdit(item)} isEdit={true} />
						<Divider />
					</View>
				)}
				keyExtractor={(item) => `${item.post_id}`}
				contentContainerStyle={{ paddingBottom: 100 }}
				ListEmptyComponent={() => (
					<Text style={{ textAlign: 'center', marginTop: 20, color: '#888' }}>
						Nenhuma notícia encontrada.
					</Text>
				)}
			/>

			<FAB style={styles.fab} icon="plus" label="Nova Notícia" onPress={handleCreateNew} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	fab: {
		position: 'absolute',
		right: 20,
		bottom: 30,
		backgroundColor: '#007AFF',
	},
});
