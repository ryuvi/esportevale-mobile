import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ImageBackground, View, Text, StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';
import { BlurView } from 'expo-blur';
import { getLeagues } from '../../api/leagues';
import PagerView from 'react-native-pager-view';
import WebView from 'react-native-webview';
import { CSS_MOBILE } from '../../components/Competition-Rounds-CSS';
import { useRoute } from '@react-navigation/native'; // Import useRoute

function LeagueItem({ league }) {
	console.log(league);
	return (
		<View key={league.id ? league.id.toString() : Math.random().toString()} style={{ flex: 1 }}>
			<Text style={{ fontSize: 30, marginHorizontal: 20, marginVertical: 10 }}>{league.nome}</Text>
			<Divider style={{ margin: 15 }} />
			<WebView
				originWhitelist={['*']}
				style={{ flex: 1, backgroundColor: 'transparent' }}
				source={{
					html: `<html><style>${CSS_MOBILE}</style><body style="font-size: 2.25rem;">${league.tabela_html}</body></html>`,
				}}
			/>
		</View>
	);
}

export default function Competition() {
	const [leagues, setLeagues] = useState([]);
	const [loading, setLoading] = useState(true);
	const route = useRoute(); // Inicializa useRoute
	const { index: initialIndex } = route.params || { index: 0 }; // Obtém o índice da rota
	const pagerRef = useRef(null);

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

	useEffect(() => {
		// Navega para a página inicial após o carregamento dos dados
		if (
			!loading &&
			pagerRef.current &&
			initialIndex !== undefined &&
			initialIndex >= 0 &&
			initialIndex < leagues.length
		) {
			pagerRef.current.setPageWithoutAnimation(initialIndex);
		}
	}, [loading, initialIndex, leagues.length, pagerRef]);

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>Carregando ligas...</Text>
			</View>
		);
	}

	if (!leagues || leagues.length === 0) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>Nenhuma liga encontrada.</Text>
			</View>
		);
	}

	return (
		<ImageBackground
			source={require('../../../assets/esportevale-removebg-preview.png')}
			style={{ flex: 1 }}
		>
			{/* <BlurView style={styles.blurView} intensity={125} /> */}
			<PagerView
				initialPage={0}
				style={{ flex: 1 }}
				orientation={'horizontal'}
				ref={pagerRef} // Adiciona a ref ao PagerView
			>
				{leagues.map((l, mapIndex) => (
					<View key={l.id ? l.id.toString() : mapIndex.toString()}>
						<LeagueItem league={l} />
					</View>
				))}
			</PagerView>
		</ImageBackground>
	);
}
