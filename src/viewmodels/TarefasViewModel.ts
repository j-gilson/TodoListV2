import { ITarefaRepositorio } from '../repositories/ITarefaRepositorio';
import { Tarefa } from '../models/Tarefa';

export class TarefasViewModel {
  private repositorio: ITarefaRepositorio;
  tarefas: Tarefa[] = [];

  constructor(repositorio: ITarefaRepositorio) {
    this.repositorio = repositorio;
  }

  async carregar(): Promise<void> {
    this.tarefas = await this.repositorio.listar();
  }

  async criar(titulo: string, descricao?: string): Promise<Tarefa> {
    if (!titulo || !titulo.trim()) throw new Error('Título obrigatório');
    const nova = await this.repositorio.criar({
      titulo: titulo.trim(),
      descricao: descricao?.trim() || '',
      concluida: false
    });
    // atualizar cache local
    this.tarefas = [nova, ...this.tarefas];
    return nova;
  }

  async excluir(id: string): Promise<void> {
    await this.repositorio.excluir(id);
    this.tarefas = this.tarefas.filter(t => t.id !== id);
  }

  async buscarPorId(id: string): Promise<Tarefa | undefined> {
    return await this.repositorio.buscarPorId(id);
  }

  async atualizar(t: Tarefa): Promise<Tarefa> {
    const updated = await this.repositorio.atualizar(t);
    this.tarefas = this.tarefas.map(x => x.id === updated.id ? updated : x);
    return updated;
  }

  getQuantidade(): number {
    return this.tarefas.length;
  }
}
