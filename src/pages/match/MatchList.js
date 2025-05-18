// MatchList.js
import React from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { BlurView } from 'expo-blur';
import { getRounds } from '../../api/leagues';
import { useState, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function MatchRender({ rounds, index, onPress }) {
	return (
		<Card style={styles.card}>
			<TouchableOpacity onPress={() => onPress(index)} style={{ flex: 1 }}>
				<Card.Actions style={{ justifyContent: 'space-between' }}>
					<Text style={{ fontSize: 16 }}>{rounds.nome}</Text>
					<Button
						icon={() => <Ionicons name="eye-outline" size={24} />}
						style={{ borderColor: '#1565C0', color: '#1565C0' }}
						mode="outlined"
					>
						Ver
					</Button>
				</Card.Actions>
			</TouchableOpacity>
		</Card>
	);
}

export default function MatchList() {
	const [rounds, setRounds] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigation = useNavigation();

	useEffect(() => {
		const fetchRounds = async () => {
			setLoading(true);
			try {
				const data = await getRounds();
				console.log(data);
				if (data.success) {
					setRounds(data.rounds);
				} else {
					console.log('Erro ao carregar rodadas:', data.message);
				}
			} catch (error) {
				console.error('Erro ao buscar rodadas:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchRounds();
	}, []);

	const handleRoundPress = (index) => {
		navigation.navigate('MatchPage', { index }); // Navega para MatchPage com o índice
	};

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<Text>Carregando rodadas...</Text>
			</View>
		);
	}

	if (!rounds || rounds.length === 0) {
		return (
			<View style={styles.emptyContainer}>
				<Text>Nenhuma rodada encontrada.</Text>
			</View>
		);
	}

	return (
		<ImageBackground
			source={require('../../../assets/esportevale-removebg-preview.png')}
			style={styles.backgroundImage}
		>
			<BlurView style={styles.blurView} intensity={125} />
			<View style={styles.headerContainer}>
				<FlatList
					data={rounds}
					keyExtractor={(item) => (item.id ? item.id.toString() : item.nome)}
					renderItem={({ item, index }) => (
						<MatchRender rounds={item} index={index} onPress={handleRoundPress} />
					)}
					contentContainerStyle={styles.listContent}
				/>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
	},
	blurView: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		filter: 'blur(.7rem)',
		zIndex: 1,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerContainer: {
		padding: 16,
		justifyContent: 'center',
		marginVertical: 'auto',
		zIndex: 2,
		flex: 1,
	},
	listContent: {
		padding: 16,
	},
	card: {
		marginBottom: 16,
		marginHorizontal: 16,
	},
});
