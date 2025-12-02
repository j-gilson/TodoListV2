import { describe, test, expect, beforeEach, vi } from "vitest";
import { ITaskRepository } from "../../../model/repositories/ITaskRepository";
import { Task } from "../../../model/entities/Task";
import { TasksViewModel } from "../../../viewmodel/TasksViewModel";

// Mock simplificado do repositório para isolar o ViewModel
function gerarRepositorioFake(): ITaskRepository {
  return {
    list: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
    findById: vi.fn(),
    update: vi.fn(),
  };
}

describe("TasksViewModel", () => {
  let repositorioFake: ITaskRepository;
  let gestorTarefas: TasksViewModel;

  beforeEach(() => {
    repositorioFake = gerarRepositorioFake();
    gestorTarefas = new TasksViewModel(repositorioFake);
  });

  test("load() deve popular a lista de tasks", async () => {
    const cargaInicial: Task[] = [
      { id: "1", title: "A", description: "Desc", completed: false },
    ];

    repositorioFake.list = vi.fn().mockResolvedValue(cargaInicial);

    await gestorTarefas.load();

    expect(gestorTarefas.tasks).toHaveLength(1);
    expect(gestorTarefas.tasks[0].title).toBe("A");
    expect(repositorioFake.list).toHaveBeenCalledOnce();
  });

  test("create() deve criar uma nova task e adicioná-la ao topo", async () => {
    const registroCriado: Task = {
      id: "abc",
      title: "Nova Task",
      description: "",
      completed: false,
    };

    repositorioFake.create = vi.fn().mockResolvedValue(registroCriado);

    const retorno = await gestorTarefas.create("Nova Task");

    expect(retorno.id).toBe("abc");
    expect(gestorTarefas.tasks[0].id).toBe("abc");
    expect(repositorioFake.create).toHaveBeenCalledOnce();
    expect(gestorTarefas.getCount()).toBe(1);
  });

  test("create() deve falhar quando o título for vazio", async () => {
    await expect(gestorTarefas.create("")).rejects.toThrow("Title is required");
    await expect(gestorTarefas.create("   ")).rejects.toThrow(
      "Title is required"
    );
  });

  test("delete() deve remover a task da lista", async () => {
    gestorTarefas.tasks = [
      { id: "1", title: "A", description: "", completed: false },
      { id: "2", title: "B", description: "", completed: true },
    ];

    repositorioFake.delete = vi.fn().mockResolvedValue(undefined);

    await gestorTarefas.delete("1");

    expect(gestorTarefas.tasks).toHaveLength(1);
    expect(gestorTarefas.tasks[0].id).toBe("2");
    expect(repositorioFake.delete).toHaveBeenCalledWith("1");
  });

  test("findById() deve chamar o repositório e retornar a task", async () => {
    const encontrado: Task = {
      id: "10",
      title: "X",
      description: "",
      completed: false,
    };

    repositorioFake.findById = vi.fn().mockResolvedValue(encontrado);

    const resultado = await gestorTarefas.findById("10");

    expect(resultado?.id).toBe("10");
    expect(repositorioFake.findById).toHaveBeenCalledWith("10");
  });

  test("update() deve atualizar a task na lista", async () => {
    gestorTarefas.tasks = [
      { id: "1", title: "A", description: "", completed: false },
    ];

    const alterada: Task = {
      id: "1",
      title: "A - editada",
      description: "Novo",
      completed: true,
    };

    repositorioFake.update = vi.fn().mockResolvedValue(alterada);

    const saida = await gestorTarefas.update(alterada);

    expect(saida.title).toBe("A - editada");
    expect(gestorTarefas.tasks[0].completed).toBe(true);
    expect(repositorioFake.update).toHaveBeenCalledOnce();
  });

  test("getCount() deve retornar o total de tasks", () => {
    gestorTarefas.tasks = [
      { id: "1", title: "A", description: "", completed: false },
      { id: "2", title: "B", description: "", completed: true },
    ];

    expect(gestorTarefas.getCount()).toBe(2);
  });
});
