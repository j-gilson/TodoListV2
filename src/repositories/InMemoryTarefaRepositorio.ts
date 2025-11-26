import { ITarefaRepositorio } from './ITarefaRepositorio';
import { Tarefa } from '../models/Tarefa';

export class InMemoryTarefaRepositorio implements ITarefaRepositorio {
  private tarefas: Tarefa[] = [];

  async listar(): Promise<Tarefa[]> {
    return [...this.tarefas];
  }

  async criar(t: Omit<Tarefa, 'id'>): Promise<Tarefa> {
    const nova: Tarefa = { ...t, id: Date.now().toString() };
    this.tarefas.unshift(nova);
    return nova;
  }

  async buscarPorId(id: string): Promise<Tarefa | undefined> {
    return this.tarefas.find(x => x.id === id);
  }

  async atualizar(t: Tarefa): Promise<Tarefa> {
    const idx = this.tarefas.findIndex(x => x.id === t.id);
    if (idx === -1) throw new Error('Tarefa não encontrada');
    this.tarefas[idx] = { ...t };
    return this.tarefas[idx];
  }

  async excluir(id: string): Promise<void> {
    this.tarefas = this.tarefas.filter(x => x.id !== id);
  }

  async limpar(): Promise<void> {
    this.tarefas = [];
  }
}
