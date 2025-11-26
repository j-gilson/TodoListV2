import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { tarefasViewModel } from '../../di/container';
import { Tarefa } from '../../models/Tarefa';

export default function DetalhesTarefa() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { id } = route.params;
  const [tarefa, setTarefa] = useState<Tarefa | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const t = await tarefasViewModel.buscarPorId(id);
      setTarefa(t);
    })();
  }, [id]);

  if (!tarefa) {
    return <View style={styles.container}><Text>Tarefa não encontrada.</Text></View>;
  }

  const confirmarExcluir = () => {
    Alert.alert('Excluir', 'Deseja realmente excluir esta tarefa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await tarefasViewModel.excluir(id);
          navigation.navigate('Lista');
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{tarefa.titulo}</Text>
      <Text style={styles.descricao}>{tarefa.descricao || '— Sem descrição —'}</Text>
      <View style={{ marginTop: 20 }}>
        <Button title="Excluir tarefa" color="#d32f2f" onPress={confirmarExcluir} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#fff' },
  titulo: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  descricao: { fontSize: 15, color: '#444' },
});
