// News.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { getContent, getContentTags } from '../../api/news'; // nova função para pegar todas as notícias públicas
import { Divider } from 'react-native-paper';
import { BlurView } from 'expo-blur'

export default function News({ navigation }) {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getContent(); // sem token
        if (data.success) {
          setNews(data.contents);
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
      tags: tags ,
      author: item.post_author_name,
      created: item.post_created
    });
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleCardSelect(item)}
    >
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
      <ImageBackground source={require('../../assets/esportevale-removebg-preview.png')} style={{ flex: 1 }}>
      <BlurView style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.5)', filter: 'blur(.7rem)', zIndex: 1 }} intensity={125} />
      <View style={styles.container}>
        <FlatList
          data={news}
          keyExtractor={(item) => `${item.post_id}`}
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
});