import React, { useState } from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  RichText,
  Toolbar,
  useEditorBridge,
} from '@10play/tentap-editor';
import {
  TextInput,
  Button,
  Surface,
  useTheme,
} from 'react-native-paper';
import { createContent } from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ContentEditor({ route, navigation }) {
  const theme = useTheme();
  const content = route?.params?.content || null;

  const [title, setTitle] = useState(content?.title ?? '');
  const [tags, setTags] = useState(content?.tags ?? '');
  const [editorContent, setEditorContent] = useState(content?.body ?? '');

  const editor = useEditorBridge();

  const saveContent = async () => {
    const content = editor.getHTML();
    const newContent = { title, tags, body: content };
    const token = await AsyncStorage.getItem('userToken');

    await createContent(title, tags, content, token);

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <TextInput
          mode="outlined"
          label="Título"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          label="Tags (separadas por vírgula)"
          value={tags}
          onChangeText={setTags}
          style={styles.input}
        />

        <Surface style={styles.editorContainer}>
          <RichText editor={editor} />
        </Surface>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.kbView}
        >
          <Toolbar editor={editor} />
        </KeyboardAvoidingView>

        <Surface style={styles.buttons}>
          <Button
            mode="contained"
            onPress={saveContent}
            style={styles.button}
          >
            {content ? 'Atualizar Conteúdo' : 'Criar Conteúdo'}
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.goBack()}
            style={styles.button}
          >
            Cancelar
          </Button>
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 16,
  },
  scroll: {
    paddingBottom: 120,
  },
  input: {
    marginBottom: 12,
  },
  editorContainer: {
    minHeight: 200,
    borderRadius: 8,
    marginBottom: 20,
    padding: 8,
    elevation: 2,
  },
  kbView: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  buttons: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
    elevation: 2,
    borderRadius: 10,
  },
  button: {
    marginHorizontal: 5,
  },
});
