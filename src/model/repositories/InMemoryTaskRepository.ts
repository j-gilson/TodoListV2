import { ITaskRepository } from './ITaskRepository';
import { Task } from '../entities/Task';

export class InMemoryTaskRepository implements ITaskRepository {
  private tasks: Task[] = [];

  async list(): Promise<Task[]> {
    return [...this.tasks];
  }

  async create(t: Omit<Task, 'id'>): Promise<Task> {
    const newTask: Task = { ...t, id: Date.now().toString() };
    this.tasks.unshift(newTask);
    return newTask;
  }

  async findById(id: string): Promise<Task | undefined> {
    return this.tasks.find(x => x.id === id);
  }

  async update(t: Task): Promise<Task> {
    const idx = this.tasks.findIndex(x => x.id === t.id);
    if (idx === -1) throw new Error('Task not found');
    this.tasks[idx] = { ...t };
    return this.tasks[idx];
  }

  async delete(id: string): Promise<void> {
    this.tasks = this.tasks.filter(x => x.id !== id);
  }

  async clear(): Promise<void> {
    this.tasks = [];
  }
}
