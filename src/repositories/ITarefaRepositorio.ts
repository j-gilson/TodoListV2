import { Tarefa } from '../models/Tarefa';

export interface ITarefaRepositorio {
  listar(): Promise<Tarefa[]>;
  criar(t: Omit<Tarefa, 'id'>): Promise<Tarefa>;
  buscarPorId(id: string): Promise<Tarefa | undefined>;
  atualizar(t: Tarefa): Promise<Tarefa>;
  excluir(id: string): Promise<void>;
  limpar?(): Promise<void>; // opcional para dev
}
