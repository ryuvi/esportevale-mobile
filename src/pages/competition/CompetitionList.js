import React from 'react';
import {
	ImageBackground,
	View,
	Text,
	StyleSheet,
	TouchableOpacity, // Import TouchableOpacity
} from 'react-native';
import { Card, Button } from 'react-native-paper';
import { BlurView } from 'expo-blur';
import { getLeagues } from '../../api/leagues';
import { useState, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

function CompetitionRender({ league, index, onPress }) {
	// Adiciona index e onPress
	return (
		<Card style={styles.card}>
			<TouchableOpacity onPress={() => onPress(index)} style={{ flex: 1 }}>
				<Card.Actions style={{ justifyContent: 'space-between' }}>
					<Text style={{ fontSize: 16 }}>{league.nome}</Text>
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

export default function CompetitionList() {
	const [leagues, setLeagues] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigation = useNavigation(); // Inicializa a navegação

	useEffect(() => {
		const fetchLeagues = async () => {
			setLoading(true);
			try {
				const data = await getLeagues();
				if (data.success) {
					setLeagues(data.leagues);
				} else {
					console.log('Erro ao carregar ligas:', data.message);
				}
			} catch (error) {
				console.error('Erro ao buscar ligas:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchLeagues();
	}, []);

	const handleLeaguePress = (index) => {
		navigation.navigate('CompetitionPage', { index }); // Navega para CompetitionPage com o índice
	};

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<Text>Carregando ligas...</Text>
			</View>
		);
	}

	if (!leagues || leagues.length === 0) {
		return (
			<View style={styles.emptyContainer}>
				<Text>Nenhuma liga encontrada.</Text>
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
					data={leagues}
					keyExtractor={(item) => (item.id ? item.id.toString() : item.nome)}
					renderItem={({ item, index }) => (
						<CompetitionRender
							league={item}
							index={index}
							onPress={handleLeaguePress} // Passa a função de navegação e o índice
						/>
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
		flex: 1, // Garante que a FlatList ocupe o espaço disponível
	},
	listContent: {
		padding: 16,
	},
	card: {
		marginBottom: 16,
		marginHorizontal: 16,
	},
});
