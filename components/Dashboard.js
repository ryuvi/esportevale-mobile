import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import { FAB, Divider } from 'react-native-paper';
import { getContent, getContentTags } from '../api/api';
import ContentCard from './ContentCard';

export default function Dashboard({ navigation }) {
  const [content, setContent] = useState([]);

  const fetchContent = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        navigation.replace('Login');
        return;
      }

      const data = await getContent(token);
      console.log(data)
      if (data.success) {
        setContent(data.contents);
      } else {
        console.log('Erro ao carregar conteúdo:', data.message);
      }
    } catch (err) {
      console.log('Erro ao carregar conteúdo', err);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleEdit = async (content) => {
    const token = await AsyncStorage.getItem('userToken');
    const tags = await getContentTags(content.post_id, token);
    navigation.navigate('ContentEditor', { content: { title: content.post_title, tags: tags, body: content.post_content } });
  };

  const handleCreateNew = () => {
    navigation.navigate('ContentEditor', {
      content: { title: '', tags: '', body: '' },
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={content}
        renderItem={({ item }) => (
          <>
            <ContentCard
              content={item}
              onEdit={() => handleEdit(item)}
              onDelete={() => {}}
            />
            <Divider />
          </>
        )}
        keyExtractor={(item) => `${item.id}`}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={handleCreateNew}
        color="white"
      />
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
