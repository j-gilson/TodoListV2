import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import ItemTarefa from '../componentes/ItemTarefa';
import { tarefasViewModel } from '../../di/container';
import { useNavigation } from '@react-navigation/native';

export default function ListaTarefas() {
  const navigation = useNavigation<any>();
  const [tarefas, setTarefas] = useState(tarefasViewModel.tarefas);

  useEffect(() => {
    (async () => {
      await tarefasViewModel.carregar();
      setTarefas([...tarefasViewModel.tarefas]);
    })();
  }, []);

  // Atualiza quando volta para esta tela
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await tarefasViewModel.carregar();
      setTarefas([...tarefasViewModel.tarefas]);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Minhas Tarefas</Text>
        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Criar')}>
          <Text style={{ color: '#fff', fontWeight: '700' }}>+ Nova</Text>
        </TouchableOpacity>
      </View>

      {tarefas.length === 0 ? (
        <View style={styles.vazio}><Text>Nenhuma tarefa ainda.</Text></View>
      ) : (
        <FlatList
          data={tarefas}
          keyExtractor={i => i.id}
          renderItem={({ item }) => (
            <ItemTarefa tarefa={item} aoPressionar={() => navigation.navigate('Detalhes', { id: item.id })} />
          )}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#f6f6f6' },
  cabecalho: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  titulo: { fontSize: 22, fontWeight: '700' },
  botao: { backgroundColor: '#2196F3', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 },
  vazio: { alignItems: 'center', marginTop: 40 }
});
