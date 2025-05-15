import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ContentCard({ content, onEdit, onDelete }) {

  const removeTags = (html) => html ? html.replace(/<[^>]*>?/gm, '') : '';
  const truncateText = (text, maxLength) => text.length > maxLength ? `${text.substr(0, maxLength-3)}...` : text;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{content.post_title}</Text>
      <Text style={styles.description}>{truncateText(removeTags(content.post_content))}</Text>
      
      <View style={styles.buttons}>
        <Button title="Editar" onPress={() => onEdit(content.id)} />
        <Button title="Deletar" onPress={() => onDelete(content.id)} />
      </View>
    </View>
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
    marginVertical: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
