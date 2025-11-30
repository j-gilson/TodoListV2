import { describe, test, expect, beforeEach, vi } from "vitest";
import { ITaskRepository } from "../../../model/repositories/ITaskRepository";
import { Task } from "../../../model/entities/Task";
import { TasksViewModel } from "../../../viewmodel/TasksViewModel";

// Mock básico do repositório
function createMockRepository(): ITaskRepository {
  return {
    list: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
    findById: vi.fn(),
    update: vi.fn(),
  };
}

describe("TasksViewModel", () => {
  let repo: ITaskRepository;
  let vm: TasksViewModel;

  beforeEach(() => {
    repo = createMockRepository();
    vm = new TasksViewModel(repo);
  });

  test("load() deve popular a lista de tasks", async () => {
    const tasks: Task[] = [
      { id: "1", title: "A", description: "Desc", completed: false },
    ];
    repo.list = vi.fn().mockResolvedValue(tasks);

    await vm.load();

    expect(vm.tasks).toHaveLength(1);
    expect(vm.tasks[0].title).toBe("A");
    expect(repo.list).toHaveBeenCalledOnce();
  });

  test("create() deve criar uma nova task e adicioná-la ao topo", async () => {
    const newTask: Task = {
      id: "abc",
      title: "Nova Task",
      description: "",
      completed: false,
    };

    repo.create = vi.fn().mockResolvedValue(newTask);

    const result = await vm.create("Nova Task");

    expect(result.id).toBe("abc");
    expect(vm.tasks[0].id).toBe("abc");
    expect(repo.create).toHaveBeenCalledOnce();
    expect(vm.getCount()).toBe(1);
  });

  test("create() deve falhar quando o título for vazio", async () => {
    await expect(vm.create("")).rejects.toThrow("Title is required");
    await expect(vm.create("   ")).rejects.toThrow("Title is required");
  });

  test("delete() deve remover a task da lista", async () => {
    vm.tasks = [
      { id: "1", title: "A", description: "", completed: false },
      { id: "2", title: "B", description: "", completed: true },
    ];

    repo.delete = vi.fn().mockResolvedValue(undefined);

    await vm.delete("1");

    expect(vm.tasks).toHaveLength(1);
    expect(vm.tasks[0].id).toBe("2");
    expect(repo.delete).toHaveBeenCalledWith("1");
  });

  test("findById() deve chamar o repositório e retornar a task", async () => {
    const t: Task = { id: "10", title: "X", description: "", completed: false };

    repo.findById = vi.fn().mockResolvedValue(t);

    const result = await vm.findById("10");

    expect(result?.id).toBe("10");
    expect(repo.findById).toHaveBeenCalledWith("10");
  });

  test("update() deve atualizar a task na lista", async () => {
    vm.tasks = [{ id: "1", title: "A", description: "", completed: false }];

    const updated: Task = {
      id: "1",
      title: "A - editada",
      description: "Novo",
      completed: true,
    };

    repo.update = vi.fn().mockResolvedValue(updated);

    const result = await vm.update(updated);

    expect(result.title).toBe("A - editada");
    expect(vm.tasks[0].completed).toBe(true);
    expect(repo.update).toHaveBeenCalledOnce();
  });

  test("getCount() deve retornar o total de tasks", () => {
    vm.tasks = [
      { id: "1", title: "A", description: "", completed: false },
      { id: "2", title: "B", description: "", completed: true },
    ];

    expect(vm.getCount()).toBe(2);
  });
});
