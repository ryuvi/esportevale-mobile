// pages/private/Dashboard.js

import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "react-native-gesture-handler";
import { FAB, Divider } from "react-native-paper";
import ContentCard from "../components/ContentCard";
import { isLogged } from "../../api/auth";
import { getContentByUser, getContentTags } from "../../api/news";

export default function Dashboard({ navigation }) {
  const [content, setContent] = useState([]);

  const fetchContent = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        navigation.replace("Login");
        return;
      }

      const data = await getContentByUser(token);
      if (data.success) {
        setContent(data.contents);
      } else {
        console.log("Erro ao carregar conteúdo:", data.message);
      }
    } catch (err) {
      console.log("Erro ao carregar conteúdo", err);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      try {
        const result = await isLogged();
        if (!result?.success) {
          await AsyncStorage.removeItem("userToken");
          navigation.replace("Login");
          return;
        }
        await fetchContent();
      } catch (err) {
        console.error("Erro ao verificar login:", err);
        await AsyncStorage.removeItem("userToken");
        navigation.replace("Login");
      }
    });

    return unsubscribe;
  }, [navigation]);

  const handleEdit = async (contentItem) => {
    const token = await AsyncStorage.getItem("userToken");
    const tags = await getContentTags(contentItem.post_id, token);
    navigation.navigate("ContentEditor", {
      content: {
        id: contentItem.post_id,
        title: contentItem.post_title,
        tags: tags,
        body: contentItem.post_content,
      },
    });
  };

  const handleDelete = async (id) => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir esta notícia?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            // Aqui você pode implementar a função deleteContent() se ainda não tiver
            console.log("Excluir conteúdo com ID:", id);
          },
        },
      ]
    );
  };

  const handleCreateNew = () => {
    navigation.navigate("ContentEditor", {
      content: { title: "", tags: "", body: "" },
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
              onEdit={handleEdit}
              onDelete={handleDelete}
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
        label="Nova Notícia"
        onPress={handleCreateNew}
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
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: "#007AFF",
  },
});
