import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { tarefasViewModel } from '../../di/container';
import { useNavigation } from '@react-navigation/native';

export default function CriarTarefa() {
  const navigation = useNavigation<any>();
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const salvar = async () => {
    try {
      await tarefasViewModel.criar(titulo, descricao);
      navigation.goBack();
    } catch (e: any) {
      alert(e.message || 'Erro ao criar tarefa');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View>
        <TextInput placeholder="Título" value={titulo} onChangeText={setTitulo} style={styles.input} />
        <TextInput placeholder="Descrição (opcional)" value={descricao} onChangeText={setDescricao} style={[styles.input, { height: 100 }]} multiline />
        <Button title="Salvar tarefa" onPress={salvar} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#fff' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginBottom: 12 },
});
