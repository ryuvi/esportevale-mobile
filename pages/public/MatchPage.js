// MatchPage.js (Renomeado de Rounds.js para clareza)
import React, { useState, useEffect, useRef } from "react";
import { ImageBackground, View, Text, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import { BlurView } from "expo-blur";
import { getRounds } from "../../api/leagues"; // Mantenha ou ajuste a função de busca
import PagerView from "react-native-pager-view";
import WebView from "react-native-webview";
import { JS, CSS_MOBILE } from "../components/Competition-Rounds-CSS";
import { useRoute } from "@react-navigation/native";

function RoundsItem({ rounds }) {
  console.log(rounds);
  return (
    <View
      key={rounds.id ? rounds.id.toString() : Math.random().toString()}
      style={{ flex: 1 }}
    >
      <Text style={{ fontSize: 30, marginHorizontal: 20, marginVertical: 10 }}>
        {rounds.nome}
      </Text>
      <Divider style={{ margin: 15 }} />
      <WebView
        originWhitelist={["*"]}
        style={{ flex: 1, backgroundColor: "" }}
        source={{
          html: `<html><style>${CSS_MOBILE}</style><body style="font-size: 2.25rem;">${rounds.rodada_html}${JS}</body></html>`,
        }}
      />
    </View>
  );
}

export default function MatchPage() { // Renomeado para MatchPage
  const [roundsData, setRoundsData] = useState([]); // Renomeado para evitar confusão
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { index: initialIndex } = route.params || { index: 0 };
  const pagerRef = useRef(null);

  useEffect(() => {
    const fetchRoundsData = async () => {
      setLoading(true);
      try {
        const data = await getRounds(); // Mantenha ou ajuste a função de busca
        if (data.success) {
          setRoundsData(data.rounds);
        } else {
          console.log("Erro ao carregar rodadas:", data.message);
        }
      } catch (error) {
        console.error("Erro ao buscar rodadas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoundsData();
  }, []);

  useEffect(() => {
    if (!loading && pagerRef.current && initialIndex !== undefined && initialIndex >= 0 && initialIndex < roundsData.length) {
      pagerRef.current.setPageWithoutAnimation(initialIndex);
    }
  }, [loading, initialIndex, roundsData.length, pagerRef]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Carregando rodadas...</Text>
      </View>
    );
  }

  if (!roundsData || roundsData.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Nenhuma rodada encontrada.</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../../assets/esportevale-removebg-preview.png")}
      style={{ flex: 1 }}
    >
      <PagerView
        initialPage={0}
        style={{ flex: 1 }}
        orientation={"horizontal"}
        ref={pagerRef}
      >
        {roundsData.map((round, mapIndex) => (
          <View key={round.id ? round.id.toString() : mapIndex.toString()}>
            <RoundsItem rounds={round} /> {/* Use RoundsItem aqui */}
          </View>
        ))}
      </PagerView>
    </ImageBackground>
  );
}