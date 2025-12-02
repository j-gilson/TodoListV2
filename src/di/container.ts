import { InMemoryTaskRepository } from '../model/repositories/InMemoryTaskRepository';
import { TasksViewModel } from '../viewmodel/TasksViewModel';
import { ITaskRepository } from '../model/repositories/ITaskRepository';

// Create the concrete implementation here and inject it into the ViewModel.
// If you want to swap the implementation (e.g., for tests), do it here.
const repository = new InMemoryTaskRepository();
export const tasksViewModel = new TasksViewModel(repository);

// Export a factory in case you need to instantiate another VM with another repo
export function createViewModelWithRepository(repo: ITaskRepository) {
  return new TasksViewModel(repo);
}
