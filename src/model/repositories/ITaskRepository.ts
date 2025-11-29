import { Task } from '../entities/Task';

export interface ITaskRepository {
  list(): Promise<Task[]>;
  create(t: Omit<Task, 'id'>): Promise<Task>;
  findById(id: string): Promise<Task | undefined>;
  update(t: Task): Promise<Task>;
  delete(id: string): Promise<void>;
  clear?(): Promise<void>; // optional for dev
}
