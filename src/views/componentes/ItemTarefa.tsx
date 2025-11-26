import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Tarefa } from '../../models/Tarefa';

interface Props {
  tarefa: Tarefa;
  aoPressionar: () => void;
}

export default function ItemTarefa({ tarefa, aoPressionar }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={aoPressionar}>
      <View>
        <Text style={styles.titulo}>{tarefa.titulo}</Text>
        {tarefa.descricao ? <Text numberOfLines={1} style={styles.descricao}>{tarefa.descricao}</Text> : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12, borderBottomWidth: 1, borderColor: '#eee', backgroundColor: '#fff' },
  titulo: { fontWeight: '700', fontSize: 16 },
  descricao: { color: '#666', marginTop: 4 }
});
