import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryTaskRepository } from '../../../model/repositories/InMemoryTaskRepository';

describe('InMemoryTaskRepository', () => {
  let repo: InMemoryTaskRepository;

  beforeEach(async () => {
    repo = new InMemoryTaskRepository();
    await repo.clear(); 
  });

  it('should start with an empty task list', async () => {
    const tasks = await repo.list();
    expect(tasks).toEqual([]);
  });

  it('should create a task and return it with an id', async () => {
    const task = await repo.create({
      title: 'Test Task',
      description: 'desc',
      completed: false,
    });

    expect(task.id).toBeDefined();
    expect(task.title).toBe('Test Task');

    const tasks = await repo.list();
    expect(tasks.length).toBe(1);
  });

  it('should insert new tasks at the beginning of the array (unshift)', async () => {
    const t1 = await repo.create({ title: 'A' });
    const t2 = await repo.create({ title: 'B' });

    const tasks = await repo.list();
    expect(tasks[0].id).toBe(t2.id);
    expect(tasks[1].id).toBe(t1.id);
  });

  it('should find a task by id', async () => {
    const created = await repo.create({ title: 'Find me' });

    const found = await repo.findById(created.id);
    expect(found).toBeDefined();
    expect(found?.title).toBe('Find me');
  });

  it('should return undefined when trying to find a non-existent id', async () => {
    const found = await repo.findById('99999');
    expect(found).toBeUndefined();
  });

  it('should update an existing task', async () => {
    const created = await repo.create({ title: 'Old title', completed: false });

    const updated = await repo.update({
      ...created,
      title: 'New title',
      completed: true,
    });

    expect(updated.title).toBe('New title');
    expect(updated.completed).toBe(true);

    const list = await repo.list();
    expect(list[0].title).toBe('New title');
  });

  it('should throw an error when trying to update a non-existent task', async () => {
    await expect(
      repo.update({
        id: 'invalid',
        title: 'whatever',
      })
    ).rejects.toThrow('Task not found');
  });

  it('should delete a task by id', async () => {
    const t1 = await repo.create({ title: 'To delete' });
    await repo.delete(t1.id);

    const tasks = await repo.list();
    expect(tasks).toEqual([]);
  });

  it('should not throw when deleting a non-existent task', async () => {
    await expect(repo.delete('invalid-id')).resolves.not.toThrow();
  });

  it('should clear all tasks', async () => {
    await repo.create({ title: 'T1' });
    await repo.create({ title: 'T2' });

    await repo.clear();
    const tasks = await repo.list();

    expect(tasks.length).toBe(0);
  });
});
