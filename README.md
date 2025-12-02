# ToDo List MVVM – Aplicativo de Tarefas com Expo, React Native e Inversão de Dependências

# INSTITUTO FEDERAL DO PIAUÍ-CAMPUS PIRIPIRI TECNÓLOGO EM ANÁLISE E DESENVOLVIMENTO DE SISTEMAS ENGENHARIA DE SOFTWARE III

# Professor

    Me.Mayllon Veras
    
# Componentes do Grupo

# Nome/ Matrícula

    Francisnilto dos Santos Nascimento/ 2024116TADS0012 
    José Gilson Araújo Rebouças/ 2024116TADS0041
    José Nilton Silva Lima/ 2024116TADS0033
    Pedro Henrique Valentino Silva Sousa/ 2024116TADS0013
    Rodrigo Cardoso de Farias/ 2024116TADS0038

Este projeto é um aplicativo mobile desenvolvido com **Expo** utilizando **React Native** e **TypeScript**, seguindo rigorosamente a arquitetura **MVVM (Model-View-ViewModel)** e aplicando **Inversão de Dependências (DI)** para organização e desacoplamento entre as camadas.  
Ele implementa um sistema simples de lista de tarefas (**ToDo List**) com três telas principais:

- **Lista de Tarefas**  
- **Criar Tarefa**  
- **Detalhes da Tarefa**

Os dados são armazenados **em memória** por meio de um **repositório in-memory**, conforme o requisito acadêmico.

---

## Arquitetura Utilizada

O projeto segue a arquitetura **MVVM**, com separação clara entre:

### **Model**
Representa as entidades do domínio.  
Ex: `Tarefa.ts`

### **View**
Responsável pela interface com o usuário.  
Ex: telas em `src/views/telas/*`

### **ViewModel**
Contém toda a lógica de negócio do app.  
É independente da camada de UI.  
Ex: `TarefasViewModel.ts`

### **Repositórios**
Camada de acesso a dados.  
Implementa uma interface (contrato) independente da ViewModel.

- `ITarefaRepositorio.ts` → Interface
- `InMemoryTarefaRepositorio.ts` → Implementação concreta

### **Inversão de Dependências (DI)**
Feita por um container simples (`container.ts`) que injeta o repositório no ViewModel.

---

## Tecnologias Utilizadas

- **Expo**
- **React Native**
- **TypeScript**
- **React Navigation (Stack Navigator)**
- **MVVM**
- **Inversão de Dependências (DI)**
- **Armazenamento em memória**
- **Hooks (useState, useEffect)**

---

## Estrutura de Pastas (Organizada)

```
src/
├─ models/
│   └─ Tarefa.ts
├─ repositories/
│   ├─ ITarefaRepositorio.ts
│   └─ InMemoryTarefaRepositorio.ts
├─ viewmodels/
│   └─ TarefasViewModel.ts
├─ di/
│   └─ container.ts
├─ views/
│   ├─ componentes/
│   │   └─ ItemTarefa.tsx
│   └─ telas/
│       ├─ ListaTarefas.tsx
│       ├─ CriarTarefa.tsx
│       └─ DetalhesTarefa.tsx
└─ navigation/
    └─ NavegacaoApp.tsx
```

---

## Funcionalidades

### **Listar tarefas**
Exibe todas as tarefas criadas.

### **Criar tarefas**
Obrigatório informar o título.

### **Visualizar detalhes**
Mostra título e descrição da tarefa.

### **Excluir tarefas**
Remove permanentemente a tarefa.

### **Arquitetura MVVM completa**
A View não contém lógica de negócio.

### **Inversão de Dependências**
A ViewModel depende de uma **interface**, não da implementação concreta.

### **Armazenamento em memória**
Sem banco de dados e sem API externa.

---

## Telas do Aplicativo

### Lista de Tarefas
Permite acessar detalhes ou criar novas tarefas.

### Criar Tarefa
Formulário simples para inserir título e descrição.

### Detalhes da Tarefa
Permite visualizar e excluir.

---

## Como Executar o Projeto

### 1. Clone o repositório
```bash
git clone https://github.com/SEU-USUARIO/TodoListV2.git
cd ToDoMVVM
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Execute o projeto
```bash
npx expo start
```

### 4. Rodar com Tunnel (quando o celular está em outra rede)
```bash
npx expo start --tunnel
```

---

## Inversão de Dependências (Explicação Rápida)

A ViewModel depende de **ITarefaRepositorio**, que é:

Um contrato  
Uma abstração  
Sem conhecer detalhes da implementação  

Assim, trocar o repositório é simples:

```ts
const repositorio = new InMemoryTarefaRepositorio();
export const tarefasViewModel = new TarefasViewModel(repositorio);
```

Poderia ser trocado para:

```ts
new TarefaRepositorioAPI()
new TarefaRepositorioSQLite()
new TarefaRepositorioAsyncStorage()
```

Sem alterar a ViewModel.

---

## Fluxo Interno

1. A View chama um método da ViewModel  
2. A ViewModel chama o repositório  
3. O repositório altera/consulta dados  
4. A View atualiza com base no estado da ViewModel  

Dessa forma, a View fica **mínima**, e a lógica **isolada**.

---

## Licença

Este projeto pode ser usado livremente para fins acadêmicos e de aprendizado.

---
