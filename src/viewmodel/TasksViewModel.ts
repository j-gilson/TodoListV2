import { ITaskRepository } from "../model/repositories/ITaskRepository";
import { Task } from "../model/entities/Task";

export class TasksViewModel {
  private repository: ITaskRepository;
  tasks: Task[] = [];

  constructor(repository: ITaskRepository) {
    this.repository = repository;
  }

  async load(): Promise<void> {
    this.tasks = await this.repository.list();
  }

  async create(title: string, description?: string): Promise<Task> {
    if (!title || !title.trim()) throw new Error("Title is required");

    const newTask = await this.repository.create({
      title: title.trim(),
      description: description?.trim() || "",
      completed: false,
    });

    this.tasks = [newTask, ...this.tasks];
    return newTask;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }

  async findById(id: string): Promise<Task | undefined> {
    return await this.repository.findById(id);
  }

  async update(t: Task): Promise<Task> {
    const updated = await this.repository.update(t);
    this.tasks = this.tasks.map((x) => (x.id === updated.id ? updated : x));
    return updated;
  }

  getCount(): number {
    return this.tasks.length;
  }
}
