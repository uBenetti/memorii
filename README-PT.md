[🇺🇸 English/Inglês](README.md)

<p align="center">
  <img src="assets/icon.svg" alt="Memorii" width="180">
</p>

<h1 align="center">Memorii</h1>

<p align="center">
  Sistema inteligente de gerenciamento de notas e checklists.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Django-6.0-green">
  <img src="https://img.shields.io/badge/Django_REST_Framework-API-red">
  <img src="https://img.shields.io/badge/React-19-blue">
  <img src="https://img.shields.io/badge/Vite-8-purple">
  <img src="https://img.shields.io/badge/JWT-Authentication-orange">
  <img src="https://img.shields.io/badge/Status-In_Development-yellow">
</p>

---

# Memorii

O **Memorii** é um sistema web de gerenciamento de notas desenvolvido como projeto acadêmico e de estudo, utilizando **Django REST Framework** no backend e **React + Vite** no frontend.

O projeto está sendo construído com foco em uma experiência moderna de organização pessoal, inspirado em aplicações como o **Google Keep**, mas com uma arquitetura própria e preparada para futuras funcionalidades.

Atualmente, o sistema permite o gerenciamento de notas de texto e checklists, com autenticação baseada em JWT e isolamento dos dados entre usuários.

---

# Objetivos do Projeto

O Memorii busca aplicar, em um único projeto, conceitos modernos de desenvolvimento Full Stack, incluindo:

- Desenvolvimento de APIs REST
- Autenticação baseada em JWT
- Desenvolvimento de interfaces com React
- Arquitetura baseada em componentes
- Criação de Hooks personalizados
- Separação de responsabilidades
- Modelagem de banco de dados
- Relacionamento entre entidades
- Gerenciamento de estado no frontend
- Boas práticas de Git e GitHub
- Desenvolvimento em ambiente local e GitHub Codespaces
- Preparação para deploy em produção
- Construção de uma arquitetura escalável

---

# Tecnologias Utilizadas

## Backend

- Python 3
- Django 6
- Django REST Framework
- Simple JWT
- SQLite (desenvolvimento)
- django-cors-headers

## Frontend

- React 19
- Vite 8
- Axios
- React Router DOM
- React Hooks

## Controle de versão

- Git
- GitHub
- GitHub Codespaces

---

# Funcionalidades Implementadas

## Sistema de autenticação

O sistema utiliza autenticação baseada em **JSON Web Tokens (JWT)**.

Atualmente, o fluxo de autenticação inclui:

- Cadastro de usuários
- Login utilizando JWT
- Geração de Access Token
- Geração de Refresh Token
- Armazenamento do Access Token no Local Storage
- Proteção das rotas do frontend
- Verificação do perfil autenticado
- Validação real do token através da API
- Persistência da sessão após recarregar a página
- Logout
- Remoção de tokens inválidos ou expirados

---

## Sistema de notas

### Notas de texto

#### As notas de texto possuem:
- Título
- Conteúdo
- Tipo da nota
- Status de fixação
- Data de criação

#### Operações disponíveis:
- Criar
- Listar
- Editar
- Excluir

### Notas Checklist

#### Uma checklist é composta por:
- Título
- Listar tarefas
- Status de conclusão de cada item
- Ordem das tarefas

---

## Organização dos dados

O sistema possui isolamento de dados por usuário.
Cada nota possui um usuário responsável:

```
User
 │
 └── Notes
      │
      ├── Text Note
      │
      └── Checklist Note
            │
            ├── ChecklistItem
            ├── ChecklistItem
            └── ChecklistItem
```

O backend utiliza o usuário autenticado através do JWT para garantir que cada usuário acesse apenas suas próprias notas.

---

## Frontend

- React Router
- Protected Routes
- Dashboard autenticado
- Componentização
- Hooks personalizados
- Grid de notas
- Modal de criação de notas
- Escolha do tipo de nota
- Formulário específico para notas de texto
- Formulário específico para checklists

---

# Estrutura Atual do Projeto

```text
memorii/
│
├── back/
│   │
│   ├── core/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   │
│   ├── notes/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   └── migrations/
│   │
│   ├── manage.py
│   └── requirements.txt
│
├── front/
│   │
│   ├── src/
│   │   │
│   │   ├── api/
│   │   │   └── api.js
│   │   │
│   │   ├── components/
│   │   │   │
│   │   │   ├── layout/
│   │   │   │   └── Header.jsx
│   │   │   │
│   │   │   ├── notes/
│   │   │   │   ├── ChooseNoteType.jsx
│   │   │   │   ├── ChecklistNoteForm.jsx
│   │   │   │   ├── CreateNoteModal.jsx
│   │   │   │   ├── EditNoteModal.jsx
│   │   │   │   ├── NoteCard.jsx
│   │   │   │   ├── NotesGrid.jsx
│   │   │   │   └── TextNoteForm.jsx
│   │   │   │
│   │   │   └── ui/
│   │   │       └── ProtectedRoute.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useNotes.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   └── Login.jsx
│   │   │
│   │   ├── routers/
│   │   │   └── AppRouters.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   └── noteService.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── assets/
│   └── icon.svg
│
├── .gitignore
└── README.md
```

---

# API

## Usuários

### Cadastro

```
POST /api/register/
```

### Login

```
POST /api/token/
```

### Perfil

```
GET /api/profile/
```

### Renovação do token

```
POST /api/token/refresh/
```

---

## Notas

### Listar

```
GET /api/notes/
```

### Criar

```
POST /api/notes/
```

Exemplo (Texto)

```json
{
    "title": "Minha Nota",
    "note_type": "text",
    "content": "Conteúdo da nota",
    "pinned": false
}
```

Exemplo (Checklist)

```json
{
    "title": "Lista de Compras",
    "note_type": "checklist",
    "content": "",
    "pinned": false,
    "items": [
        {
            "text": "Leite",
            "completed": false
        },
        {
            "text": "Pão",
            "completed": false
        }
    ]
}
```

### Atualizar

```
PUT /api/notes/{id}/
```

### Excluir

```
DELETE /api/notes/{id}/
```

---

# Segurança

- Autenticação JWT
- Endpoints protegidos
- Authorization Header
- Rotas protegidas no React
- Validação do token através da API
- Remoção automática de tokens inválidos
- Isolamento de dados por usuário

---

# Arquitetura

O projeto segue uma arquitetura baseada na separação de responsabilidades.

## Frontend

### Components

Responsáveis pela interface visual

```text
Header
NoteCard
NotesGrid
CreateNoteModal
EditNoteModal
```

### Hooks

Responsáveis pela lógica reutilizável.

```text
useAuth
useNotes
```

### Services

Responsáveis pela comunicação com a API.

```text
authService
noteService
```

### Protected Routes

Responsáveis por impedir o acesso de usuários não autenticados.

## Backend

A API utiliza a arquitetura tradicional do Django REST Framework:
```text 
  Models
    ↓
Serializers
    ↓
  Views
    ↓
   URLs
    ↓
   API
```

---

# Desenvolvimento em GitHub Codespaces

O projeto também está preparado para desenvolvimento através do GitHub Codespaces.

Essa configuração permite continuar o desenvolvimento em computadores com limitações de instalação de software, como ambientes escolares.

O Codespace permite executar:
```text
Backend Django
        +
Frontend React/Vite
```
em um ambiente virtualizado na nuvem.

Isso permite acessar o projeto a partir de diferentes computadores sem precisar instalar localmente todas as ferramentas de desenvolvimento.

---

# Próximas Implementações

## Checklists

- Exibir tarefas diretamente no NoteCard
- Marcar tarefas como concluídas
- Riscar tarefas concluídas
- Atualizar o estado de cada tarefa
- Reordenar tarefas
- Inserir novas tarefas durante a edição
- Excluir tarefas individualmente

## Organização

- Fixar notas
- Filtrar notas fixadas
- Pesquisa de notas
- Drag and Drop entre notas
- Drag and Drop entre tarefas
- Ordenação automática
- Organização por categorias

## Interface

- Implementação completa do layout visual
- Interface moderna inspirada no conceito inicial do Memorii
- Responsividade
- Animações
- Dark Theme
- Melhorias nos modais
- Feedback visual para ações
- Estados vazios
- Estados de erro

## Autenticação

- Renovação automática do Access Token utilizando o Refresh Token
- Expiração de sessão
- Melhor gerenciamento global da autenticação
- Centralização do estado de autenticação através de Context API

## Backend

- Migração de SQLite para PostgreSQL
- Deploy do backend
- Upload de imagens
- Anexos
- Compartilhamento de notas
- Sistema de permissões
- Melhorias na validação dos dados

---

# Status do Projeto

## ✅ Concluído

- Estrutura inicial do projeto
- Backend Django
- API REST
- Cadastro de usuários
- Login com JWT
- Access Token
- Refresh Token
- Perfil autenticado
- Rotas protegidas
- Logout
- Validação real do token
- Persistência da autenticação
- Remoção de tokens inválidos
- CRUD de notas
- Notas de texto
- Estrutura de checklists
- ChecklistItems
- Associação entre notas e tarefas
- Isolamento de dados por usuário
- Hooks personalizados
- useAuth
- useNotes
- Serviços de API
- Dashboard autenticado
- Grid de notas
- Cards de notas
- Modal de criação
- Escolha do tipo de nota
- Formulário de nota de texto
- Formulário de checklist
- Modal independente de edição
- Exclusão de notas
- Estado de carregamento das notas
- Separação entre criação e edição de notas
- Configuração para desenvolvimento através do GitHub Codespaces
- Marcação de tarefas concluídas
- Organização visual das notas
- Estados vazios
- Renovação automática do JWT

---

## Em desenvolvimento:

- Renderização visual completa das checklists
- Marcação de tarefas concluídas
- Interface final
- Organização visual das notas
- Estados vazios
- Estados de erro
- Sistema de fixação de notas
- Drag and Drop
- Sistema de pesquisa
- Dark Theme
- Responsividade
- Renovação automática do JWT

---

# Autor

**Pedro Benetti**

Estudante de Desenvolvimento de Software Multiplatform — FATEC Itaquera.

O Memorii é um projeto desenvolvido com foco no aprendizado prático de desenvolvimento Full Stack moderno utilizando Django REST Framework e React.

O projeto aplica conceitos de:
- Desenvolvimento de APIs REST
- Autenticação e segurança
- Arquitetura de software
- Componentização
- Gerenciamento de estado
- Modelagem de dados
- Boas práticas de Git e GitHub
- Desenvolvimento de aplicações escaláveis

---

# Estado Atual

## 🚧 Em desenvolvimento ativo. 🚧

O projeto continua evoluindo progressivamente, com foco na construção de uma aplicação completa de organização pessoal baseada em notas, checklists e futuras funcionalidades de produtividade.
