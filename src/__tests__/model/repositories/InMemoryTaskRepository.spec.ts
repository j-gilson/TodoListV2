import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryTaskRepository } from '../../../model/repositories/InMemoryTaskRepository';
import { Task } from '../../../model/entities/Task';

describe('InMemoryTaskRepository - Create and Delete', () => {
  let repository: InMemoryTaskRepository;

  beforeEach(async () => {
    repository = new InMemoryTaskRepository();
    await repository.clear();
  });
  // -------CREATE TASK TEST--------------------------------------------------------------------
  describe('create()', () => {
    it('It must create a task successfully', async () => {
      const newTask = await repository.create({
        title: 'New Task',
        description: 'Task description',
        completed: false
      });

      expect(newTask).toHaveProperty('id');
      expect(newTask.title).toBe('New Task');
      expect(newTask.description).toBe('Task description');
      expect(newTask.completed).toBe(false);

      const tasks = await repository.list();
      expect(tasks.length).toBe(1);
    });

    it('It must add a task on the top of the list', async () => {
      const t1 = await repository.create({
        title: 'Task 1',
        description: '',
        completed: false
      });

      const t2 = await repository.create({
        title: 'Task 2',
        description: '',
        completed: false
      });

      const tasks = await repository.list();

      expect(tasks[0].id).toBe(t2.id);
      expect(tasks[1].id).toBe(t1.id);
    });
  });

  // -------DELETE TASK TEST--------------------------------------------------------------------
  describe('delete()', () => {
    it('It must delete a task successfully', async () => {
      const task = await repository.create({
        title: 'Task to delete',
        description: '',
        completed: false
      });

      await repository.delete(task.id);

      const tasks = await repository.list();
      expect(tasks.length).toBe(0);
    });

    it('It must not fail at trying to delete a non existent task', async () => {
      await repository.create({
        title: 'Test Task',
        description: '',
        completed: false
      });

      await expect(repository.delete('non_existent_id')).resolves.not.toThrow();

      const tasks = await repository.list();
      expect(tasks.length).toBe(1);
    });

    it('It must remove only the task with the correspondent id ', async () => {
      const t1 = await repository.create({
        title: 'Task 1',
        description: '',
        completed: false
      });

      await new Promise(resolve => setTimeout(resolve, 2)); 

      const t2 = await repository.create({
        title: 'Task 2',
        description: '',
        completed: false
      });

      await repository.delete(t1.id);

      const tasks = await repository.list();

      expect(tasks.length).toBe(1);
      expect(tasks[0].id).toBe(t2.id);
    });
  });
});
