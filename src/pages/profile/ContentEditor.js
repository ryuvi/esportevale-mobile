import React, { useState, useEffect } from 'react';
import { Platform, KeyboardAvoidingView, StyleSheet, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RichText, Toolbar, useEditorBridge } from '@10play/tentap-editor';
import { TextInput, Button, Surface, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isLogged } from '../../api/auth';
import { createContent } from '../../api/news';

export default function ContentEditor({ route, navigation }) {
	const theme = useTheme();
	const content = route?.params?.content || null;

	console.log(content);

	const [title, setTitle] = useState(content?.title ?? '');
	const [tags, setTags] = useState(
		Array.isArray(content?.tags) ? content.tags.join(', ') : (content?.tags ?? ''),
	);
	const [editorContent, setEditorContent] = useState(content?.body ?? '');
	const editor = useEditorBridge();

	const hasInitialized = React.useRef(false);

	useEffect(() => {
		if (editor.isReady && editorContent && !hasInitialized.current) {
			editor.commands.setHtml(editorContent);
			hasInitialized.current = true;
		}
	}, [editor.isReady, editorContent]);

	useEffect(() => {
		const checkLogin = async () => {
			try {
				const result = await AsyncStorage.getItem('userToken');
				if (!result) {
					await AsyncStorage.removeItem('userToken');
					navigation.replace('Login');
				}
			} catch (error) {
				console.error('Erro ao verificar login:', error);
				await AsyncStorage.removeItem('userToken');
				navigation.replace('Login');
			}
		};

		checkLogin();
	}, []);

	const saveContent = async () => {
		const htmlBody = await editor.getHTML();
		const token = await AsyncStorage.getItem('userToken');

		if (!title.trim() || !htmlBody.trim()) {
			console.log('Tets');
			alert('Título e conteúdo são obrigatórios!');
			return;
		}

		// Separa tags por vírgulas, remove espaços extras
		const tagList = tags
			.split(',')
			.map((t) => t.trim())
			.filter((t) => t);

		try {
			if (content?.id) {
				await createContent(content.id, title, tagList, htmlBody, token);
			} else {
				await createContent(title, htmlBody, tagList, token);
			}
			navigation.goBack();
		} catch (error) {
			console.error('Erro ao salvar conteúdo:', error);
			alert('Erro ao salvar. Tente novamente.');
		}
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
						onPress={() => saveContent()}
						style={styles.button}
						buttonColor="#007AFF"
					>
						<Text>Salvar Conteúdo</Text>
					</Button>
					<Button
						mode="outlined"
						onPress={() => navigation.goBack()}
						style={{ ...styles.button, borderColor: '#007AFF' }}
						textColor="#007AFF"
					>
						<Text>Cancelar</Text>
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
		borderColor: '#007AFF',
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
