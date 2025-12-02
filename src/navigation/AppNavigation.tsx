import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskList from '../view/pages/TaskList';
import CreateTask from '../view/pages/CreateTask';
import TaskDetails from '../view/pages/TaskDetails';
import { MainRoutes } from '../../types';

const Stack = createNativeStackNavigator<MainRoutes>();

export const AppNavigation = () => (
  <Stack.Navigator initialRouteName="List">
    <Stack.Screen name="List" component={TaskList} options={{ title: 'Tarefas' }} />
    <Stack.Screen name="Create" component={CreateTask} options={{ title: 'Criar tarefa' }} />
    <Stack.Screen name="Details" component={TaskDetails} options={{ title: 'Detalhes' }} />
  </Stack.Navigator>
);
