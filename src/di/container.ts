import { InMemoryTarefaRepositorio } from '../repositories/InMemoryTarefaRepositorio';
import { TarefasViewModel } from '../viewmodels/TarefasViewModel';
import { ITarefaRepositorio } from '../repositories/ITarefaRepositorio';

// Crie aqui a implementação concreta e a injete no ViewModel.
// Se quiser trocar a implementação (por exemplo, para tests), faça aqui.
const repositorio = new InMemoryTarefaRepositorio();
export const tarefasViewModel = new TarefasViewModel(repositorio);

// exporta factory se precisar instanciar outro VM com outro repo
export function criarViewModelComRepositorio(repo: ITarefaRepositorio) {
  return new TarefasViewModel(repo);
}
