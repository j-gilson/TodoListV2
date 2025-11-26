import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListaTarefas from '../views/telas/ListarTarefas';
import CriarTarefa from '../views/telas/CriarTarefa';
import DetalhesTarefa from '../views/telas/DetalhesTarefa';
import { RotasPrincipais } from '../../tipos';

const Stack = createNativeStackNavigator<RotasPrincipais>();

export const NavegacaoApp = () => (
  <Stack.Navigator initialRouteName="Lista">
    <Stack.Screen name="Lista" component={ListaTarefas} options={{ title: 'Tarefas' }} />
    <Stack.Screen name="Criar" component={CriarTarefa} options={{ title: 'Criar Tarefa' }} />
    <Stack.Screen name="Detalhes" component={DetalhesTarefa} options={{ title: 'Detalhes' }} />
  </Stack.Navigator>
);
